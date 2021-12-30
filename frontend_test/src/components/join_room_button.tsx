import {Room} from '../models';

export function JoinRoomButton(props: {room: Room}) {
  return (
    <input type="button" value={`${props.room.roomId}`} />
  );
}
