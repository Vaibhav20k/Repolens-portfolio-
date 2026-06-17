# Phase 2: Debug & Stability Review

## Objective

Perform a complete diagnostic and stabilization pass on the Portfolio Copilot terminal system before introducing new features.

The goal of this phase is to ensure:

* OpenRouter integration functions correctly.
* Natural language queries are processed reliably.
* Terminal interactions are stable.
* Resize and drag behavior are independent.
* Cursor visibility is restored.
* Overall UX quality meets production standards.

---

# Issue 1: AI Responses Not Working Correctly

## Current Behavior

The terminal responds to predefined commands or hardcoded prompts, but natural language questions are not consistently reaching the OpenRouter inference layer.

Examples:

* "help" works
* "projects" works
* "What technologies do you use?" fails or produces no response
* "Tell me about OrbitAir" fails or does not reach the model

---

## Expected Behavior

All non-command queries should flow through the complete AI pipeline:

User Input
↓
Command Parser
↓
Intent Classifier
↓
Portfolio Copilot Service
↓
OpenRouter API
↓
Streaming Response
↓
Terminal Output

---

## Tasks

### Pipeline Verification

Audit and verify:

* Terminal input handler
* Command routing system
* Intent classification layer
* Portfolio Copilot client
* OpenRouter API integration
* Streaming response rendering

### Diagnostics

Add temporary logging for:

* User query
* Parsed command
* Classified intent
* OpenRouter request payload
* OpenRouter response
* Terminal render events

### Validation

Verify all intent types work:

* GENERAL
* PORTFOLIO
* REPOSITORY

### Deliverables

Provide:

* Root cause analysis
* Broken pipeline stage
* Proposed fix
* Implemented fix

---

# Issue 2: Terminal Resize Behavior

## Current Behavior

Resizing the terminal changes both:

* Width/height
* Position

The terminal drifts while being resized.

---

## Expected Behavior

Resizing should only affect:

* Width
* Height

Position should remain fixed.

Only drag interactions should modify:

* X position
* Y position

---

## Tasks

Audit:

* Drag handlers
* Resize handlers
* Motion transforms
* Position state
* Dimension state

Implement:

* Separate resize state
* Separate drag state
* Independent persistence

### Validation

During resize:

Position must remain unchanged.

During drag:

Dimensions must remain unchanged.

---

# Issue 3: Terminal Typography

## Current Behavior

Terminal text is too small.

Readability is poor on:

* Desktop
* Laptop
* Mobile

---

## Expected Behavior

Terminal should remain authentic while being readable.

---

## Tasks

Review:

* Terminal output text
* Input field text
* Welcome banner
* Command history
* System messages
* Source attribution

Adjust:

* Font size
* Line height
* Spacing
* Responsive scaling

---

# Issue 4: Cursor Visibility

## Current Behavior

Custom cursor is not visible on the landing page.

Potential causes:

* Z-index conflicts
* Overlay conflicts
* Initialization issues
* Pointer event conflicts

---

## Expected Behavior

Cursor remains visible during:

* Loading screen
* Hero section
* Navigation interactions
* Terminal interactions

---

## Tasks

Audit:

* Cursor component mount lifecycle
* Global cursor state
* Z-index hierarchy
* Pointer events
* Overlay stacking contexts

Implement necessary fixes.

---

# Issue 5: Terminal UX Audit

Perform a complete review of:

## State Management

Verify:

* Message history
* Streaming updates
* Window state
* Resize state
* Drag state

---

## Input Handling

Verify:

* Focus management
* Keyboard interactions
* Enter key handling
* Escape key handling

---

## Scrolling

Verify:

* Auto-scroll behavior
* Streaming updates
* Long responses
* Mobile scrolling

---

## Rendering

Verify:

* Streaming chunks
* Re-renders
* Performance
* Animation smoothness

---

# Deliverables

Before modifying code:

Provide:

## 1. Root Cause Analysis

Identify:

* AI failures
* Resize failures
* Cursor failures
* Typography issues

---

## 2. Files Requiring Modification

List:

* Components
* Hooks
* Services
* Utilities
* Stylesheets

---

## 3. Implementation Plan

Describe:

* Proposed fixes
* Architectural impact
* Potential risks

---

## 4. Apply Fixes

Only after approval of the implementation plan.

---

# Constraints

Do NOT introduce:

* New AI features
* RAG systems
* ChromaDB
* Embeddings
* Additional UI modules

Focus exclusively on:

* Stability
* Reliability
* AI functionality
* Interaction quality
* Production readiness

This phase is a stabilization phase, not a feature expansion phase.
