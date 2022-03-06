import { Admin, Consumer, Kafka, Producer } from "kafkajs";

export const kafkaStore = new Map<string, Kafka>();
