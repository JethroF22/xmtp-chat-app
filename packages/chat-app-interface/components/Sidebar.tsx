import { useContext } from 'react';
import styled from '@emotion/styled';

import { Context } from '../context/state';
import { ActionTypes } from '../context/types';

const StyledDiv = styled.div`
  width: 25%;
  height: 100%;
  color: #fff;
  border-right: 1px solid #fff;
  padding-left: 15px;

  h3 {
    margin-bottom: 10px;
  }

  .contact-list {
    overflow-y: auto;
  }

  .list-item {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    height: 50px;
    width: 90%;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .list-item:hover {
    background-color: #202c33;
    border-radius: 5px;
  }
`;

function Sidebar() {
  const {
    state: { conversations },
    dispatch,
  } = useContext(Context);

  const setAddress = (address: string) => {
    dispatch({
      type: ActionTypes.UPDATE_STATE,
      key: 'selectedAddress',
      data: address,
    });
  };

  return (
    <StyledDiv>
      <h3>Contacts</h3>
      <div className="contact-list">
        {conversations.map((conversation) => (
          <div className="list-item" key={conversation.topic}>
            <div onClick={() => setAddress(conversation.peerAddress)}>
              {conversation.peerAddress}
            </div>
          </div>
        ))}
      </div>
    </StyledDiv>
  );
}

export default Sidebar;
