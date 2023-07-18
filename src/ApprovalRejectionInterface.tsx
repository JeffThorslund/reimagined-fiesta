import React, { useState, useEffect } from 'react';
import { Button, Modal, Text } from '@mantine/core';

const accessToken = '';
const owner = 'AcertaAnalyticsSolutions';
const repo = 'hackathon-teamfrank';

const PipelineApproval = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(()=>{
    //approvebuild()
  }, [])

  const handleApprove = async () => {

    await approvebuild().then(() => {
       setIsApproved(true);
    setIsModalOpen(false);
    })
    
    // Perform additional actions for approving the pipeline deployment
  };

  const handleReject = () => {
    setIsApproved(false);
    setIsModalOpen(false);
    // Perform additional actions for rejecting the pipeline deployment
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Open Approval Modal</Button>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Pipeline Deployment Approval"
      >
        <Text size="xl" align="center">
          Do you approve or reject the pending pipeline deployment?
        </Text>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            onClick={handleApprove}
            color="teal"
            variant="outline"
            disabled={isApproved}
            style={{ marginRight: '10px' }}
          >
            Approve
          </Button>
          <Button
            onClick={handleReject}
            color="red"
            variant="outline"
            disabled={isApproved}
          >
            Reject
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const getPrs = () => {  
 return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=all&sort=created&direction=desc&page=1&per_page=1`, {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${accessToken}`
  }
  })
  .then(response => response.json())
  .then(data => {
    // Access the most recent pull request data
    const mostRecentPullRequest = data[0];
    console.log(mostRecentPullRequest);
  })
  .catch(error => {
    console.log('Error:', error);
  });
}

const approvePr = async () => {
  return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${2}/reviews`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: 'APPROVE'
    })
  })
    .then(response => {
      if (response.ok) {
        console.log('Pull request approved successfully');
      } else {
        console.log('Failed to approve the pull request');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });  
}

const approvebuild = async () => {
const accessToken = '';
const organization = 'acerta';
const project = 'Line%20Pulse';
const deploymentId = 'YOUR_DEPLOYMENT_ID';
const rejectionComments = 'Rejection comments';

const apiUrl = `https://dev.azure.com/${organization}/${project}/_apis/release/deployments?api-version=7.0`;

return fetch(apiUrl, {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})
  .then(response => {
    if (response.ok) {
      console.log('Deployment rejected successfully.');
      // Handle the success response here
    } else {
      console.error('Failed to reject the deployment.');
      // Handle the error response here
    }
  })
  .catch(error => {
    console.error('An error occurred while making the request:', error);
    // Handle any network or other errors here
  });
}

export default PipelineApproval;
