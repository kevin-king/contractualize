module.exports.CommonHeaderParams = [
  {
    in: "header",
    name: "X-Test-Id",
    description: "HTTP header for testing",
    required: true,
    schema: {
      type: "string",
      format: "uuidv4",
      default: "{{X-Test-Id}}",
    },
  },
];
