import React, { useState, useRef } from "react";
import StarRatings from "react-star-ratings";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { uploadData } from "aws-amplify/storage";
import { post } from "aws-amplify/api";
import oneplusbannerimage from "../Assets/images/oneplus banner image.jpg";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HeadsetIcon from "@mui/icons-material/Headset";

const productExample = {
  image: `${oneplusbannerimage}`,
  title: "OnePlus 13 | Smarter with OnePlus AI | ",
  subtitle:
    "Lifetime Display Warranty (12GB RAM, 256GB Storage Midnight Ocean)",
};

const AmazonReviewForm = ({ productId, product = productExample }) => {
  // Toggle: "text" or "audio"
  const [reviewType, setReviewType] = useState("text");

  // Shared
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [photoFileNames, setPhotoFileNames] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Text review
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Audio review
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioFileName, setAudioFileName] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Toggle handler
  const handleReviewTypeChange = (_, newType) => {
    if (newType) setReviewType(newType);
  };

  // Photo upload
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedPhotos = [];
    const previews = [];
    const fileNames = [];
    for (const file of files) {
      try {
        const fileName = `reviews/${Date.now()}_${file.name}`;
        await uploadData({
          path: fileName,
          data: file,
          options: {
            contentType: file.type,
            accessLevel: "guest",
          },
        }).result;
        uploadedPhotos.push(fileName);
        previews.push(URL.createObjectURL(file));
        fileNames.push(file.name);
      } catch (err) {
        // Ignore upload error for preview
      }
      fileNames.push(file.name);
    }
    setPhotos([...photos, ...uploadedPhotos]);
    setPhotoPreviews([...photoPreviews, ...previews]);
    setPhotoFileNames([...photoFileNames, ...fileNames]);
  };

  // Audio recording logic
  const startRecording = async () => {
    setAudioBlob(null);
    setAudioUrl("");
    setAudioFileName("");
    setIsRecording(true);
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };
    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
      setAudioFileName(`reviews/audio_${Date.now()}.webm`);
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    };
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  // Submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let reviewData = {
        productId,
        rating,
        photos,
        reviewType,
      };

      if (reviewType === "text") {
        if (rating === 0 || !title.trim() || !content.trim())
          return setIsSubmitting(false);
        reviewData = { ...reviewData, title, content };
      }
      if (reviewType === "audio") {
        if (rating === 0 || !audioBlob) return setIsSubmitting(false);
        // Upload audio to S3
        const fileName = audioFileName || `reviews/audio_${Date.now()}.webm`;
        await uploadData({
          path: fileName,
          data: audioBlob,
          options: { contentType: "audio/webm", accessLevel: "guest" },
        }).result;
        reviewData = { ...reviewData, audio: fileName };
      }

      await post({
        apiName: "reviewsApi",
        path: "/reviews",
        options: { body: reviewData },
      });

      setSuccess(true);
      setRating(0);
      setTitle("");
      setContent("");
      setPhotos([]);
      setPhotoPreviews([]);
      setPhotoFileNames([]);
      setAudioBlob(null);
      setAudioUrl("");
      setAudioFileName("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      // Optionally show error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E3E6E6",
        minHeight: "100vh",
        py: { xs: 4, md: 2.5 },
      }}
    >
      <Card
        sx={{
          maxWidth: 650,
          mx: "auto",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        {/* Product Info */}
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.3 }}>
          Review for
        </Typography>
        <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <Grid item>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 1,
                objectFit: "contain",
                bgcolor: "#fafafa",
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ lineHeight: 1.2 }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.2 }}
            >
              {product.subtitle}
            </Typography>
          </Grid>
        </Grid>

        {/* Toggle Button for Review Type */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={reviewType}
            exclusive
            onChange={handleReviewTypeChange}
            aria-label="review type"
            color="primary"
            sx={{
              bgcolor: "#f7f7f7",
              borderRadius: 2,
              p: 0.5,
              "& .MuiToggleButton-root": {
                fontWeight: 600,
                fontSize: 16,
                px: 3,
                py: 1,
                border: "none",
                "&.Mui-selected": {
                  bgcolor: "#FFD814",
                  color: "#111",
                },
              },
            }}
          >
            <ToggleButton value="text" aria-label="text review">
              <RateReviewIcon />
            </ToggleButton>
            <ToggleButton value="audio" aria-label="audio review">
              <HeadsetIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Shared: Star Rating */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
              Overall rating
            </Typography>
            <StarRatings
              rating={rating}
              starRatedColor="#ffa41c"
              starHoverColor="#ffa41c"
              starDimension="32px"
              starSpacing="4px"
              changeRating={setRating}
              numberOfStars={5}
              name="rating"
            />
          </Box>
          {/* Shared: Photo Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
              Add a photo or video
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Shoppers find images and videos more helpful than text alone.
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <label>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    border: "2px dashed #d1d5db",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#fafafa",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "#ffa41c" },
                  }}
                >
                  <AddAPhotoIcon color="action" fontSize="large" />
                </Box>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  hidden
                />
              </label>
              {photoPreviews.length > 0 && (
                <Stack direction="row" spacing={1}>
                  {photoPreviews.map((src, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={src}
                      alt={`Review ${i + 1}`}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                        border: "1px solid #eee",
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
            {/* --- THE ONLY CHANGE: file names box --- */}
            {photoFileNames.length > 0 && (
              <Box
                sx={{
                  mt: 1,
                  width: 260,
                  minHeight: 24,
                  maxHeight: 28,
                  overflowX: "auto",
                  overflowY: "auto",
                  whiteSpace: "nowrap",
                  border: "1px solid #eee",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  bgcolor: "#f9f9f9",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {photoFileNames.map((name, idx) => (
                  <Typography
                    key={idx}
                    variant="caption"
                    sx={{
                      color: "#555",
                      fontSize: 13,
                      maxWidth: 120,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      mr: 2,
                      display: "inline-block",
                      cursor: "pointer",
                    }}
                    title={name}
                  >
                    {name}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>

          {/* Text Review Form */}
          {reviewType === "text" && (
            <>
              {/* Headline */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
                  Add a headline
                </Typography>
                <TextField
                  fullWidth
                  id="review-title"
                  placeholder="What's most important to know?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  size="small"
                  inputProps={{ maxLength: 100 }}
                />
              </Box>
              {/* Written Review */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
                  Write your review
                </Typography>
                <TextField
                  fullWidth
                  id="review-content"
                  placeholder="What did you like or dislike? What did you use this product for?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={5}
                  size="medium"
                  inputProps={{ maxLength: 1000 }}
                />
              </Box>
            </>
          )}

          {/* Audio Review Form */}
          {reviewType === "audio" && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
                Save your audio review
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                {!isRecording && !audioBlob && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MicIcon />}
                    onClick={startRecording}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  >
                    Start Recording
                  </Button>
                )}
                {isRecording && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={stopRecording}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  >
                    Stop Recording
                  </Button>
                )}
                {audioBlob && (
                  <Stack direction="row" spacing={2} alignItems="center">
                    <audio
                      controls
                      src={audioUrl}
                      style={{ outline: "none" }}
                    />
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<MicIcon />}
                      onClick={startRecording}
                      sx={{ fontWeight: 600, borderRadius: 2 }}
                    >
                      Re-record
                    </Button>
                  </Stack>
                )}
              </Stack>
              {audioBlob && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 1, color: "#555" }}
                >
                  Audio review ready to submit.
                </Typography>
              )}
            </Box>
          )}

          {/* Submit */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              disabled={
                isSubmitting ||
                rating === 0 ||
                (reviewType === "text" && (!title.trim() || !content.trim())) ||
                (reviewType === "audio" && !audioBlob)
              }
              sx={{
                px: 6,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 1px 4px 0 rgba(0,0,0,0.06)",
              }}
            >
              {isSubmitting
                ? "Submitting..."
                : reviewType === "audio"
                ? "Submit Audio Review"
                : "Submit Review"}
            </Button>
          </Box>

          {success && (
            <Box sx={{ mt: 3 }}>
              <Typography color="success.main" fontWeight={600}>
                Review submitted successfully!
              </Typography>
            </Box>
          )}
        </form>
      </Card>
    </Box>
  );
};

export default AmazonReviewForm;
