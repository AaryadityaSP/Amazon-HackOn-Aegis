import axios from "axios";

const TEXT_REVIEW_URL = "https://fftet7pfwk.execute-api.ap-south-1.amazonaws.com/prod";
const AUDIO_S3_GENERATE_URL = "https://mg8vke2yk8.execute-api.ap-south-1.amazonaws.com/prod/audio-reviews";

// Text review submission
export async function submitTextReview({
  user_id,
  productId,
  rating,
  title,
  content,
  photos,
  isBuyer,
}) {
  try {
    const response = await axios.post(
      `${TEXT_REVIEW_URL}/reviews`,
      {
        user_id,
        product_id: productId,
        rating,
        title,
        content,
        photos,
        is_buyer: isBuyer,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Audio review functions
export async function getPresignedUrl(user_id, filename) {
  const response = await axios.post(AUDIO_S3_GENERATE_URL, {
    action: "generate_upload_url",
    user_id,
    filename,
  });
  return response.data;
}

export async function submitAudioReview({
  user_id,
  productId,
  rating,
  audio_key,
  photos,
}) {
  const response = await axios.post(`${AUDIO_S3_GENERATE_URL}`, {
    user_id,
    product_id: productId,
    rating,
    audio_key,
    photos,
    type: "audio",
  });
  return response.data;
}

export async function uploadAudioToS3(uploadUrl, file) {
  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": file.type },
  });
}

// Collaboration API call
export async function requestCollaboration({
  user_id,
  collaborator_id,
  product_id,
}) {
  try {
    const response = await axios.post(
      "https://5apys8j895.execute-api.ap-south-1.amazonaws.com/prod/collaborations",
      {
        action: "create",
        user_id,
        collaborator_id,
        product_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Collaboration API Error:", error);
    throw error;
  }
}

// Trust score API call function
export async function getTrustScore(productId, description) {
  try {
    const response = await axios.post(
      "https://t79ov3wv80.execute-api.ap-south-1.amazonaws.com/prod/check",
      {
        product_id: 'oneplus13',
        //description: description,
        amazon_url: `https://www.gsmarena.com/oneplus_13-13477.php${productId}`,
        official_url: `https://www.gsmarena.com/oneplus_13-13477.php/${productId}`
      }
    );
    
    // Extract score from response
    const responseBody = JSON.parse(response.data.body);
    const scoreMatch = responseBody.match(/AI Score: (\d+)/);
    return scoreMatch ? scoreMatch[1] : "N/A";
  } catch (error) {
    console.error("Trust score API error:", error);
    return "N/A";
  }
}

// Description analyzer API call
export async function getDescriptionScore(description) {
  try {
    const response = await axios.post(
      "https://t79ov3wv80.execute-api.ap-south-1.amazonaws.com/prod/check",
      { text: Array.isArray(description) ? description.join(' ') : description }
    );
    // The API returns { statusCode: 200, body: "\"Success! AI Score: 0\"" }
    if (response.data && response.data.body) {
      // Remove extra quotes if present
      let bodyString = response.data.body;
      if (bodyString.startsWith('"') && bodyString.endsWith('"')) {
        bodyString = bodyString.slice(1, -1);
      }
      // Now extract the score using regex
      const match = bodyString.match(/AI Score: (\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
      throw new Error("AI Score not found in response");
    }
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Description analysis error:", error);
    return 0;
  }
}

