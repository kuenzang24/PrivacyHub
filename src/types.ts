/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenID =
  | "splash"
  | "onboarding"
  | "signup"
  | "login"
  | "home"
  | "create_post"
  | "profile"
  | "trust_log"
  | "privacy_settings"
  | "ownership_proof"
  | "privacy_policy"
  | "terms_conditions"
  | "post_detail";

export interface User {
  username: string;
  displayName: string;
  email: string;
  bio: string;
  avatarUrl: string;
  isVerified: boolean;
  privacyScore: number;
  postsCount: number;
  connectionsCount: number;
  trustActionsCount: number;
}

export interface Comment {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  isVerifiedUser: boolean;
  timestamp: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  isLikedByUser?: boolean;
  visibility: "Public" | "Friends only" | "Private";
  isSystemUpdate?: boolean;
  assetHash?: string;
  trustStatus?: "Recorded" | "Secured" | "Pending";
}

export interface TrustEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  category: "ai_safety" | "consent" | "legal" | "auth" | "account" | "post";
  blockchainHash: string;
  status: "RECORDED" | "UPDATED" | "ACTIVE";
}

export interface AppState {
  currentScreen: ScreenID;
  navigationStack: ScreenID[];
  selectedPostId?: string; // For detail screen
  selectedProofPostId?: string; // For ownership proof
  currentUser: User;
  usersList: User[];
  postsList: Post[];
  trustEventsList: TrustEvent[];
  
  // Settings & Toggles
  profileVisibility: boolean;
  activityStatus: boolean;
  aiSafetyScanConsent: boolean;
  explainAiWarnings: boolean;
  analyticsConsent: boolean;
  
  // Pending Post draft holding if AI prompt triggers
  pendingPostDraft?: {
    content: string;
    imageUrl?: string;
    visibility: "Public" | "Friends only" | "Private";
    aiSafetyScan: boolean;
  };
}
