export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "0.0.0.0"),
      port: env.int("DATABASE_PORT", 1337),
      database: env("DATABASE_NAME", "top"),
      user: env("DATABASE_USERNAME", "pg"),
      password: env("DATABASE_PASSWORD", "ffff"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
