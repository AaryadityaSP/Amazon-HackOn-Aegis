import { Amplify } from "aws-amplify";

Amplify.configure({
  API: {
    REST: {
      reviews: {
        endpoint: "https://fftet7pfwk.execute-api.ap-south-1.amazonaws.com/prod",
        region: "ap-south-1",
      },
    },
  },
   Auth: {
    region: "ap-south-1",
    credentials: {
      accessKeyId: "AKIAV3SS2UWGJSELABMA",
      secretAccessKey: "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",
    },
  },

});
