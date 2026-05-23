/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Home as HomeIcon, 
  PlusCircle, 
  ShieldCheck, 
  User as UserIcon, 
  Wifi, 
  BatteryCharging, 
  LockKeyhole 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types and Initial mockups dataset
import { ScreenID, User, Post, TrustEvent, AppState } from "./types";
import { INITIAL_USER, INITIAL_POSTS, INITIAL_TRUST_EVENTS } from "./mockData";

// View Screens imports
import Splash from "./components/Splash";
import Onboarding from "./components/Onboarding";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import HomeFeed from "./components/HomeFeed";
import CreatePost from "./components/CreatePost";
import AIWarningModal from "./components/AIWarningModal";
import TrustLog from "./components/TrustLog";
import Profile from "./components/Profile";
import PrivacySettings from "./components/PrivacySettings";
import OwnershipProof from "./components/OwnershipProof";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import PostDetail from "./components/PostDetail";

export default function App() {
  // Mobile UI Environment clock state
  const [deviceTime, setDeviceTime] = useState("");
  
  // Real Local States mapping to types.ts 'AppState' layout
  const [currentScreen, setCurrentScreen] = useState<ScreenID>("splash");
  const [navigationStack, setNavigationStack] = useState<ScreenID[]>(["splash"]);
  const [selectedPostId, setSelectedPostId] = useState<string>("post_1");
  const [selectedProofPostId, setSelectedProofPostId] = useState<string>("post_1");

  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USER);
  const [postsList, setPostsList] = useState<Post[]>(INITIAL_POSTS);
  const [trustEventsList, setTrustEventsList] = useState<TrustEvent[]>(INITIAL_TRUST_EVENTS);

  // Privacy Settings Switches State
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  const [aiSafetyScanConsent, setAiSafetyScanConsent] = useState(true);
  const [explainAiWarnings, setExplainAiWarnings] = useState(true);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  // Safety Warning Draft states holding
  const [showAIWarning, setShowAIWarning] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<{
    content: string;
    imageUrl?: string;
    visibility: "Public" | "Friends only" | "Private";
  } | null>(null);

  // Dynamic system clock simulator
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      setDeviceTime(`${hours}:${mins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  // Back Navigation Helper pushing/popping routes states
  const handleGoBack = () => {
    if (navigationStack.length <= 1) {
      // Default fallback
      setCurrentScreen("onboarding");
      return;
    }
    const stack = [...navigationStack];
    stack.pop(); // Pop current screen
    const prev = stack[stack.length - 1];
    setNavigationStack(stack);
    setCurrentScreen(prev);
  };

  const handleNavigate = (screen: ScreenID) => {
    setNavigationStack((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  // Helper template generating random cryptographic hashes
  const generateRandomHash = () => {
    const chars = "0123456789ABCDEF";
    let hash = "";
    for (let i = 0; i < 40; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
  };

  // Dynamic logger emitting consensus blocks
  const triggerLogRecord = (
    title: string,
    description: string,
    category: "ai_safety" | "consent" | "legal" | "auth" | "account" | "post"
  ) => {
    const epoch = new Date();
    const stamp = epoch.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) + " • " + epoch.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    const newEvent: TrustEvent = {
      id: `ev_${Date.now()}`,
      title,
      description,
      timestamp: stamp,
      category,
      blockchainHash: generateRandomHash(),
      status: "RECORDED"
    };

    setTrustEventsList((prev) => [newEvent, ...prev]);
    
    // Increment stats count on active user card
    setCurrentUser((prev) => ({
      ...prev,
      trustActionsCount: prev.trustActionsCount + 1
    }));
  };

  // User Actions Sign Up Sync
  const handleSignUpSuccess = (usr: string, emailStr: string) => {
    const updatedUser: User = {
      ...INITIAL_USER,
      username: usr,
      displayName: usr.charAt(0).toUpperCase() + usr.slice(1),
      email: emailStr,
      trustActionsCount: 1 // Accept terms consent log
    };
    setCurrentUser(updatedUser);
    
    // Clear ledger backlog and log new accepted consents
    triggerLogRecord("Account registered successfully", `Cryptographic profile created for @${usr} with direct identity key.`, "auth");
    
    // Forward Session directly to Home Feed
    handleNavigate("home");
  };

  const handleLoginSuccess = (emailStr: string) => {
    // If logging into pre-existing user (Elena Vance) or simple mock email
    const preExisting = emailStr.toLowerCase().includes("elena");
    const display = preExisting ? "Elena Vance" : "Tester Profile";
    const user = preExisting ? "elena_vance" : "tester_node";

    setCurrentUser({
      ...INITIAL_USER,
      username: user,
      displayName: display,
      email: emailStr
    });

    triggerLogRecord("Session logged in", `User authorized via secure password envelope. IP signature: Local Node.`, "auth");
    handleNavigate("home");
  };

  // Physical key authenticators
  const handlePasskeySuccess = () => {
    setCurrentUser({
      ...INITIAL_USER,
      username: "kuenzang",
      displayName: "Kuenzang G.",
      email: "secure@kuenzang.dev"
    });

    triggerLogRecord("Passkey Identity verified", "FIDO2 physical device key successfully synced and ledger verified.", "auth");
    handleNavigate("home");
  };

  // Create post submit validation
  const handleCreatePost = (data: {
    content: string;
    imageUrl?: string;
    visibility: "Public" | "Friends only" | "Private";
    aiSafetyScan: boolean;
  }) => {
    // Check if scan is toggled ON and has sequence lookups matches
    const hasPhonePattern = /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(data.content) || 
                            data.content.toLowerCase().includes("phone") ||
                            data.content.toLowerCase().includes("contact") ||
                            data.content.toLowerCase().includes("+1-206-555");

    if (data.aiSafetyScan && hasPhonePattern) {
      // Hold and display bottom sheet warnings
      setPendingDraft({
        content: data.content,
        imageUrl: data.imageUrl,
        visibility: data.visibility
      });
      setShowAIWarning(true);
      triggerLogRecord("AI Safety scanner active alerts", "PII sequence patterns intercepted. Prompted security warnings sheet.", "ai_safety");
      return;
    }

    // No warning fallback -> create post
    executePublishPost(data.content, data.imageUrl, data.visibility, "Secured");
  };

  const executePublishPost = (
    text: string, 
    attachment?: string, 
    privacyLevel: "Public" | "Friends only" | "Private" = "Friends only",
    logTag: "Secured" | "Pending" | "Recorded" = "Secured"
  ) => {
    const postHash = generateRandomHash();
    
    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isVerifiedUser: currentUser.isVerified,
      timestamp: "Just now",
      content: text,
      imageUrl: attachment,
      likes: 0,
      comments: [],
      visibility: privacyLevel,
      assetHash: postHash,
      trustStatus: logTag
    };

    setPostsList((prev) => [newPost, ...prev]);
    
    // Log post creations to the local block database
    triggerLogRecord(
      "Content ledger written", 
      `Published post with hash index ${postHash.slice(0,10)}... Privacy: ${privacyLevel}.`, 
      "post"
    );

    handleNavigate("home");
  };

  // Warning Modal Actions callbacks
  const handleConfirmFriendsOnly = () => {
    if (!pendingDraft) return;
    executePublishPost(pendingDraft.content, pendingDraft.imageUrl, "Friends only", "Secured");
    setPendingDraft(null);
    setShowAIWarning(false);
  };

  const handleEditDraft = () => {
    // Closes popup warning and remains in editing interface
    setPendingDraft(null);
    setShowAIWarning(false);
  };

  const handlePostAnyway = () => {
    if (!pendingDraft) return;
    // Commits override in Trust timeline with a clear alert notice
    executePublishPost(pendingDraft.content, pendingDraft.imageUrl, pendingDraft.visibility, "Pending");
    
    triggerLogRecord(
      "AI Warning Overridden", 
      "User manually bypassed phone/contact privacy alerts. Published as public index.", 
      "ai_safety"
    );

    setPendingDraft(null);
    setShowAIWarning(false);
  };

  // Like counters logic
  const handleLikePost = (pId: string) => {
    setPostsList((prev) => 
      prev.map((p) => {
        if (p.id === pId) {
          const liked = !p.isLikedByUser;
          return {
            ...p,
            isLikedByUser: liked,
            likes: liked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  // Adding comment logic
  const handleAddComment = (pId: string, commentText: string) => {
    const commentHash = `c_${Date.now()}`;
    const newCommentModel = {
      id: commentHash,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatarUrl || "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=100&auto=format&fit=crop&q=80",
      content: commentText,
      timestamp: "Just now"
    };

    setPostsList((prev) => 
      prev.map((p) => {
        if (p.id === pId) {
          return {
            ...p,
            comments: [...p.comments, newCommentModel]
          };
        }
        return p;
      })
    );

    triggerLogRecord("Feedback node written", `Added comment to post #0x${pId.slice(0, 4)} on secure channels.`, "post");
  };

  const activePost = postsList.find(p => p.id === selectedPostId);
  const activeProofPost = postsList.find(p => p.id === selectedProofPostId);

  return (
    <div className="min-h-screen bg-[#F0F3F3] text-brand-dark flex flex-col justify-center items-center py-6 px-4 font-sans antialiased selection:bg-brand-mint selection:text-brand-primary">
      
      {/* Dynamic Device Emulator Layout Frame for desktop browsers */}
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        
        {/* Device Wrapper */}
        <div 
          className="w-full max-w-full h-[100vh] md:max-w-[420px] md:max-h-[860px] md:h-[90vh] md:border-[12px] md:border-[#1E2222] md:rounded-[48px] md:shadow-2xl relative overflow-hidden bg-brand-surface flex flex-col transition-all bg-white"
          id="smartphone-simulator"
        >
          
          {/* Dynamic Island bar camera Notch */}
          <div className="hidden md:block absolute top-3.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1E2222] rounded-full z-30" />

          {/* Smartphone Status indicators bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] font-extrabold text-brand-muted/80 tracking-wide font-mono z-20 select-none bg-brand-surface border-b border-brand-outline-variant/10 select-none flex-shrink-0">
            <span>{deviceTime || "10:24 AM"}</span>
            
            {/* Safe Node Active Status Badge */}
            <div className="flex items-center space-x-1 uppercase text-[9px] font-black text-[#2c6956]">
              <LockKeyhole className="w-3 h-3 text-[#2c6956]" />
              <span>Node 07 Secure</span>
            </div>

            <div className="flex items-center space-x-1.5 pt-0.5">
              <Wifi className="w-3.5 h-3.5 text-brand-primary" />
              <BatteryCharging className="w-4 h-4 text-brand-secondary animate-pulse" />
            </div>
          </div>

          {/* Core Content Container Screens Renderer */}
          <div className="flex-grow overflow-hidden relative flex flex-col h-0 bg-brand-surface">
            
            <AnimatePresence mode="wait">
              {currentScreen === "splash" && (
                <motion.div
                  key="splash"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col"
                >
                  <Splash onComplete={() => handleNavigate("onboarding")} />
                </motion.div>
              )}
              
              {currentScreen === "onboarding" && (
                <motion.div
                  key="onboarding"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <Onboarding onNavigate={handleNavigate} />
                </motion.div>
              )}

              {currentScreen === "signup" && (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <SignUp 
                    onNavigate={handleNavigate}
                    onGoBack={handleGoBack}
                    onSignUpSuccess={handleSignUpSuccess}
                  />
                </motion.div>
              )}

              {currentScreen === "login" && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <Login 
                    onNavigate={handleNavigate}
                    onGoBack={handleGoBack}
                    onLoginSuccess={handleLoginSuccess}
                    onAuthenticatePasskey={handlePasskeySuccess}
                  />
                </motion.div>
              )}

              {currentScreen === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col"
                >
                  <HomeFeed 
                    posts={postsList}
                    onNavigate={handleNavigate}
                    onSelectPost={(pId) => setSelectedPostId(pId)}
                    onLikePost={handleLikePost}
                  />
                </motion.div>
              )}

              {currentScreen === "create_post" && (
                <motion.div
                  key="create_post"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  className="w-full h-full flex flex-col"
                >
                  <CreatePost 
                    onCancel={handleGoBack}
                    onSubmitPost={handleCreatePost}
                  />
                </motion.div>
              )}

              {currentScreen === "trust_log" && (
                <motion.div
                  key="trust_log"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col"
                >
                  <TrustLog 
                    events={trustEventsList}
                    onNavigate={handleNavigate}
                  />
                </motion.div>
              )}

              {currentScreen === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col"
                >
                  <Profile 
                    user={currentUser}
                    posts={postsList}
                    onNavigate={handleNavigate}
                    onSelectProofPost={(prId) => setSelectedProofPostId(prId)}
                  />
                </motion.div>
              )}

              {currentScreen === "privacy_settings" && (
                <motion.div
                  key="privacy_settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <PrivacySettings 
                    onGoBack={handleGoBack}
                    onNavigate={handleNavigate}
                    profileVisibility={profileVisibility}
                    setProfileVisibility={setProfileVisibility}
                    activityStatus={activityStatus}
                    setActivityStatus={setActivityStatus}
                    aiSafetyScanConsent={aiSafetyScanConsent}
                    setAiSafetyScanConsent={setAiSafetyScanConsent}
                    explainAiWarnings={explainAiWarnings}
                    setExplainAiWarnings={setExplainAiWarnings}
                    analyticsConsent={analyticsConsent}
                    setAnalyticsConsent={setAnalyticsConsent}
                    onTriggerLog={triggerLogRecord}
                  />
                </motion.div>
              )}

              {currentScreen === "ownership_proof" && (
                <motion.div
                  key="ownership_proof"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="w-full h-full flex flex-col"
                >
                  <OwnershipProof 
                    onGoBack={handleGoBack}
                    post={activeProofPost}
                    currentUsername={currentUser.username}
                  />
                </motion.div>
              )}

              {currentScreen === "privacy_policy" && (
                <motion.div
                  key="privacy_policy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <PrivacyPolicy onGoBack={handleGoBack} />
                </motion.div>
              )}

              {currentScreen === "terms_conditions" && (
                <motion.div
                  key="terms_conditions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <TermsConditions onGoBack={handleGoBack} />
                </motion.div>
              )}

              {currentScreen === "post_detail" && (
                <motion.div
                  key="post_detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col"
                >
                  <PostDetail 
                    onGoBack={handleGoBack}
                    post={activePost}
                    onAddComment={handleAddComment}
                    onLikePost={handleLikePost}
                    currentUsername={currentUser.username}
                    currentAvatarUrl={currentUser.avatarUrl}
                    currentDisplayName={currentUser.displayName}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI Warning Modal Overlay bottom-sheet */}
            {showAIWarning && (
              <AIWarningModal 
                onClose={() => setShowAIWarning(false)}
                onConfirmFriendsOnly={handleConfirmFriendsOnly}
                onEditPost={handleEditDraft}
                onPostAnyway={handlePostAnyway}
              />
            )}

          </div>

          {/* Persistently Mounted Tab Navigation Panel on relevant logged-in pages */}
          {["home", "trust_log", "profile"].includes(currentScreen) && (
            <div className="border-t border-brand-outline-variant/30 px-6 py-3 bg-white/95 backdrop-blur-md flex items-center justify-between z-20 flex-shrink-0 select-none">
              
              {/* Route 1: Home Feed */}
              <button 
                onClick={() => handleNavigate("home")}
                className={`flex flex-col items-center space-y-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${currentScreen === "home" ? 'bg-brand-mint text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}
              >
                <HomeIcon className="w-5 h-5" strokeWidth={currentScreen === "home" ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Feed</span>
              </button>

              {/* Route 2: Create post trigger */}
              <button 
                onClick={() => handleNavigate("create_post")}
                className={`flex flex-col items-center space-y-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${currentScreen === "create_post" ? 'bg-brand-mint text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}
              >
                <PlusCircle className="w-5 h-5" strokeWidth={2} />
                <span className="text-[10px] font-bold">Create</span>
              </button>

              {/* Route 3: Trust Center ledger logs */}
              <button 
                onClick={() => handleNavigate("trust_log")}
                className={`flex flex-col items-center space-y-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${currentScreen === "trust_log" ? 'bg-brand-mint text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}
              >
                <ShieldCheck className="w-5 h-5" strokeWidth={currentScreen === "trust_log" ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Trust Log</span>
              </button>

              {/* Route 4: User Profile settings */}
              <button 
                onClick={() => handleNavigate("profile")}
                className={`flex flex-col items-center space-y-1 py-1 px-3.5 rounded-xl transition-all cursor-pointer ${currentScreen === "profile" ? 'bg-brand-mint text-brand-primary' : 'text-brand-muted hover:text-brand-primary'}`}
              >
                <UserIcon className="w-5 h-5" strokeWidth={currentScreen === "profile" ? 2.5 : 2} />
                <span className="text-[10px] font-bold">Profile</span>
              </button>

            </div>
          )}

          {/* Bottom Tactile swipe indicators bar on PC display bezel frames mockup */}
          <div className="hidden md:block select-none h-4 bg-brand-surface relative z-20 flex-shrink-0">
            <div className="mx-auto w-32 h-1 bg-[#1E2222]/30 rounded-full mt-1.5" />
          </div>

        </div>

        {/* Ambient PC outer hints display */}
        <p className="hidden md:block mt-4 text-[10px] text-brand-muted font-bold font-mono tracking-widest uppercase cursor-default opacity-85 select-none">
          Click bezel items to navigate. Secure local sandboxed preview mode.
        </p>

      </div>
    </div>
  );
}
