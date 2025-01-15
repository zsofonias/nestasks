export class InvalidTaskStatusException extends Error {
  constructor(public message: string = 'Invalid tasks status update') {
    super(message);
  }
}
