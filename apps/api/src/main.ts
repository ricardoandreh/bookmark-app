import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const cors = await import("@fastify/cors");
  await app.register(cors.default, {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  console.log('API iniciada com sucesso!');
  void app.listen(3000, "0.0.0.0");
}

bootstrap();
