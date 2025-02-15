"use client";

import React, { useState } from "react";
import { FaLightbulb, FaPaperPlane, FaSpinner } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./page.css";

// Définir une interface pour les informations de la vidéo
interface VideoDetails {
    title: string;
    description: string;
    lengthSeconds: string;
    viewCount: string;
    author: string;
  }  

  interface VideoInfo {
    videoDetails : VideoDetails
  }

export default function AgentPage() {
    const [videoUrl, setVideoUrl] = useState("");
   const [videoInfo, setVideoInfo] = useState<VideoInfo | null >();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const generateBlogPost = async () => {
        if (!videoUrl) {
            alert("Please enter a topic");
            return;
        }

        setIsLoading(true);
        setError(null);
        setVideoInfo(null);

        try {
            const response = await fetch(
                `/api/agents?topic=${encodeURIComponent(videoUrl)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (data.output) {
                const formattedBlogPost = data.output
                setVideoInfo(formattedBlogPost);
            } else {
                setError(data.message || "Failed to generate blog post");
            }
        } catch (error) {
            console.error("Error generating blog post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-blog-container">
            <div className="ai-blog-wrapper">
                <h1 className="ai-blog-title">AI Blog Generator</h1>

                <div className="ai-blog-card">
                    <div className="input-container">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="Enter a topic... E.g. 'AI News Sep, 2024'"
                                className="topic-input"
                                onKeyPress={(e) =>
                                    e.key === "Enter" && generateBlogPost()
                                }
                            />
                        </div>
                        <button
                            onClick={generateBlogPost}
                            disabled={isLoading}
                            className={`generate-button ${
                                isLoading ? "disabled" : ""
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <FaSpinner className="mr-2 animate-spin" />{" "}
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane className="mr-2" /> Generate
                                </>
                            )}
                        </button>
                    </div>

                    {isLoading && (
                        <div className="loading-spinner">
                            <FaSpinner className="mx-auto text-2xl animate-spin" />
                            <p className="mt-2">Generating blog post...</p>
                        </div>
                    )}

                    {error && <div className="error-message">{error}</div>}

                    {videoInfo && (
                        <div className="blog-post-section">
                            <h2 className="blog-post-title">
                                Generated Blog Post
                            </h2>
                            <div className="blog-post-content">
                                <div className="markdown">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                    >
                                        {videoInfo.videoDetails.description}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    )}

                    {videoInfo && (
                        <div className="search-results-section">
                            <h2 className="search-results-title">
                                video infos
                            </h2>
                            <div className="space-y-2">
                            <div
                                        className="search-result-item"
                                    >
                                        <h3 className="search-result-title">
                                            {videoInfo.videoDetails.title}
                                        </h3>
                                        <p className="search-result-snippet">
                                            {videoInfo.videoDetails.description}
                                        </p>
                                    </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}