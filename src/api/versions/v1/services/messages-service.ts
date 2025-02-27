import { inject, injectable } from "@needle-di/core";
import { KVService } from "../../../../core/services/kv-service.ts";
import { MessageKV } from "../interfaces/kv/message-kv.ts";
import {
  CreateMessageRequest,
  GetMessageResponse,
} from "../schemas/messages-schemas.ts";

@injectable()
export class MessagesService {
  constructor(private kvService = inject(KVService)) {}

  public async list(): Promise<GetMessageResponse> {
    const entries: Deno.KvListIterator<MessageKV> = this.kvService
      .listMessages();
    const messages: MessageKV[] = [];

    for await (const entry of entries) {
      messages.push(entry.value);
    }

    // order by timestamp desc
    messages.sort((a, b) => b.timestamp - a.timestamp);

    return messages;
  }

  public async create(messageRequest: CreateMessageRequest): Promise<void> {
    await this.kvService.setMessage({
      ...messageRequest,
      timestamp: Date.now(),
    });
  }

  public async delete(timestamp: string): Promise<void> {
    await this.kvService.deleteMessage(parseInt(timestamp));
  }
}
