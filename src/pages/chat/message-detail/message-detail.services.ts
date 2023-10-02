import { Message as MessageRes } from 'src/components/atoms/message/message.types';
import { createChatMessage, Message, Participant } from 'src/core/api';
import { post } from 'src/core/http';
import { PostMessagePayload, PostMessageResp } from 'src/core/types';

import { OnPostMessageParams } from './message-detail.types';

export async function postMessage(payload: PostMessagePayload): Promise<PostMessageResp> {
  return post(`chats/${payload.id}/messages`, { text: payload.text }).then(({ data }) => data);
}

export async function onPostMessage(payload: OnPostMessageParams): Promise<MessageRes> {
  const resp = await createChatMessage(payload.id, { text: payload.text });

  return {
    id: resp.id,
    identityType: payload.identity.type,
    img: payload.identity.meta.image || '',
    text: resp.text,
    type: 'sender',
    time: resp.created_at.toString(),
  };
}

function getImage(myId: string, msgId: string, participants: Participant[]): string {
  const msgIsMine = msgId === myId;
  const participant = participants.find((p) => p.identity_id === msgId);
  if (msgIsMine) {
    return participant.identity_meta.image || '';
  } else {
    return participant.identity_meta.avatar || '';
  }
}

function getIdentityType(msgId: string, participants: Participant[]): 'organizations' | 'users' {
  return participants.find((p) => p.id === msgId)?.type as 'organizations' | 'users';
}

export function getParticipantDetail(id: string, participants: Participant[] = []): Participant {
  return participants.find((p) => p.id !== id) || ({} as Participant);
}

export function chatListAdaptor(
  myId: string,
  messagesList: Message[] = [],
  participants: Participant[] = [],
): MessageRes[] {
  const list = messagesList.map((msg) => {
    const isMyMessage = msg.identity_id === myId;
    return {
      id: msg.id,
      type: isMyMessage ? 'sender' : ('receiver' as 'sender' | 'receiver'),
      text: msg.text,
      identityType: getIdentityType(msg.id, participants),
      img: getImage(myId, msg.identity_id, participants),
      time: msg.updated_at.toString(),
    };
  });

  return list.reverse();
}
