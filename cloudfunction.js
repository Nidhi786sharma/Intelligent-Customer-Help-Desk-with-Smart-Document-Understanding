function main(params) {
  if (params.name) {
    return { greeting: `Hello ${params.name}` };
  }
  return { greeting: 'Hello nidhi!' };
}

exports.main = main;
