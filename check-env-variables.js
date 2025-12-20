const c = require("ansi-colors");

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
];

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter((env) => !process.env[env.key]);

  if (missingEnvs.length === 0) {
    return;
  }

  const isCI = process.env.CI === "true"; // Coolify/Nixpacks/Prod = true

  console.error(
    c.red.bold("\n⚠️ Missing required environment variables:\n")
  );

  missingEnvs.forEach((env) => {
    console.error(c.yellow(`  - ${c.bold(env.key)}`));
    if (env.description) {
      console.error(c.dim(`      ${env.description}\n`));
    }
  });

  if (isCI) {
    // En production : on prévient, mais on ne casse PAS
    console.error(
      c.yellow(
        "⚠️ Running in CI/production — the application will continue, but features may break.\n"
      )
    );
  } else {
    // En local : on bloque
    console.error(
      c.red(
        "❌ Please set these variables in your .env before starting the application.\n"
      )
    );
    process.exit(1);
  }
}

module.exports = checkEnvVariables;
