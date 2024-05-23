import React, { useState } from 'react';

const CommentItem = ({_id,  comm, userInfo, comms, setComms }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(comm.message);

  async function handleDelete(){
   
    try {
      const response = await fetch(`http://localhost:4000/comment/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const updatedComms = comms.filter(comm => comm._id !== _id);
    // Update the state with the new array
      setComms(updatedComms);
        console.log('Comment deleted successfully.');
        window.alert('Comment deleted successfully!');
      } else {
        
        console.error('Failed to delete comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditedMessage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/comment/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: editedMessage }),
      });
  
      if (response.ok) {
        // Extract the updated comment data from the response
        const updatedCommentData = await response.json();
        // Update the comms state with the updated comment
        const updatedComms = comms.map((c) => {
          if (c._id === updatedCommentData._id) {
            return updatedCommentData;
          }
          return c;
        });
        // Update the state with the new array
        setComms(updatedComms);
        console.log('Comment updated successfully.');
        window.alert('Comment updated successfully!');
        setEditMode(false);
      } else {
        console.error('Failed to update comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };
  return (
    <div className="comment">
      <p className="author">user-{`${comm.author['username']}`}</p>
      {editMode ? (
        <textarea
          className="edit-message"
          value={editedMessage}
          onChange={handleChange}
        />
      ) : (
        <p className="message">{comm.message}</p>
      )}
      <p className="date">
        {comm.createdAt
          ? new Date(comm.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'No date available'}
      </p>
      {userInfo.id === comm.author['_id'] || userInfo.id === comm.author ? (
        <div className="button-container">
          {editMode ? (
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
          )}
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default CommentItem;