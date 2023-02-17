import Pinecone from "./pinecone/client";
import SlackClient from "./slack/client";
import SlackMessage from "./slack/models/message";

const pinecone = new Pinecone({
  namespace: "slack",
  indexName: "adam-test-jira-2023-02-08-01",
});
// const sessionData = new SessionData({ namespace: "slack" });
const slackClient = new SlackClient();

const getSingleSlackChannel = async (channelId) => {
  console.time("getSingleSlackChannel");
  let channel;

  try {
    if (!channelId)
      throw new Error(`No channel with key "${channelId}" found.`);
    let data = await slackClient.exportMessagesFromChannel(channelId);
    if (!data || data.errors) {
      throw new Error(
        `channelId:${channelId} - ${data?.errorMessages?.join(" | ")}`
      );
    }

    channel = data.map((message) => new SlackMessage(message));
  } catch (error) {
    console.error(error);
  }

  console.timeEnd("getSingleSlackChannel");

  return channel;
};

const prepareAllForEmbedding = async (objects) => {
  console.time("prepareAllForEmbedding");
  let preparedStatuses;
  try {
    if (!objects) throw new Error("Invalid objects");
    let promises = [];

    for (const obj of objects) {
      if (obj) promises.push(obj.prepareForEmbedding());
    }
    preparedStatuses = await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }

  console.timeEnd("prepareAllForEmbedding");
  return preparedStatuses;
};

const indexSingleSlackChannel = async (channelId) => {
  console.time("indexSingleSlackChannel");
  const data = await getSingleSlackChannel(channelId);
  console.log("data", data);
  const vectorData = await prepareAllForEmbedding(data);
  // sessionData.addVectors(vectorData);
  await pinecone.writeVectorsToIndex(vectorData);
  console.timeEnd("indexSingleSlackChannel");
};

(async () => {
  try {
    await indexSingleSlackChannel("C01S3TGLL4W");
  } catch (error) {
    console.error(`Error: ${error?.response?.data?.message} (${error})`);
  }
})();
