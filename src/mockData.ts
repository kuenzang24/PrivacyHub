/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Post, TrustEvent } from "./types";

export const INITIAL_USER: User = {
  username: "elena_vance",
  displayName: "Elena Vance",
  email: "elena@vance.io",
  bio: "Advocating for digital sovereignty and ethical AI. Sharing my journey towards a decentralized and transparent web. Let's reclaim our data.",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  isVerified: true,
  privacyScore: 98,
  postsCount: 142,
  connectionsCount: 892,
  trustActionsCount: 24, // initial action events
};

export const INITIAL_POSTS: Post[] = [
  {
    id: "post_1",
    authorName: "Elena Vance",
    authorUsername: "elena_vance",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    isVerifiedUser: true,
    timestamp: "2 hours ago",
    content: "Finding peace in digital minimalism today. Decided to disconnect for 4 hours and the clarity is unmatched. Has anyone else tried a scheduled blackout?",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80", // Elegant minimalistic desk layout / glass
    likes: 24,
    comments: [
      {
        id: "c1",
        authorName: "Elena Rossi",
        authorUsername: "elena_rossi",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        content: "Exactly! The transparency of this hub is what we've been missing. Great share.",
        timestamp: "1h ago"
      },
      {
        id: "c2",
        authorName: "Marcus Chen",
        authorUsername: "marcus_chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        content: "I'm still struggling with the cross-site tracking settings. Any tips for a beginner?",
        timestamp: "45m ago"
      }
    ],
    visibility: "Friends only",
    assetHash: "8F92A1D7B4E562C1897AFEEF3D9A2B4C12D5E123",
    trustStatus: "Secured"
  },
  {
    id: "post_2",
    authorName: "Marcus Thorne",
    authorUsername: "marcus_thorne",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    isVerifiedUser: false,
    timestamp: "5 hours ago",
    content: "Just audited my app permissions. It's wild how many services want background location for no reason. Stay vigilant out there. 🛡️",
    likes: 152,
    comments: [],
    visibility: "Public",
    assetHash: "C92FA3B5E0D71A8DE82F01AAEE29F71B32092CDF",
    trustStatus: "Secured"
  },
  {
    id: "post_3",
    authorName: "PrivacyHub Official",
    authorUsername: "privacy_hub",
    authorAvatar: "", // Empty to trigger PH initials
    isVerifiedUser: true,
    timestamp: "System Update",
    content: "Our new \"Zero-Knowledge\" storage protocol is now live for all Trust Log entries. Your data remains yours, even from us.",
    likes: 312,
    comments: [],
    visibility: "Public",
    isSystemUpdate: true,
    assetHash: "A29BF91C2D41F59B2E36D96EE701AEE39121DF12",
    trustStatus: "Secured"
  }
];

export const INITIAL_TRUST_EVENTS: TrustEvent[] = [
  {
    id: "ev_1",
    title: "AI safety scan enabled",
    description: "Successfully configured real-time PII monitoring for outgoing posts.",
    timestamp: "23 May 2026 • 14:22",
    category: "ai_safety",
    blockchainHash: "8F92A1D7B4E562C1897AFEEF3D9A2B4C12D5E123",
    status: "RECORDED"
  },
  {
    id: "ev_2",
    title: "Analytics consent turned off",
    description: "Switched off non-essential telemerics and marketing cookies.",
    timestamp: "23 May 2026 • 09:15",
    category: "consent",
    blockchainHash: "B721C90D1A3F58DE39AA9CEE1FDF71A2E39D2C1B",
    status: "RECORDED"
  },
  {
    id: "ev_3",
    title: "Terms & Conditions accepted",
    description: "Agreed to community safety measures and ethical data interaction rules.",
    timestamp: "22 May 2026 • 18:40",
    category: "legal",
    blockchainHash: "C92FA3B5E0D71A8DE82F01AAEE29F71B32092CDF",
    status: "RECORDED"
  }
];
