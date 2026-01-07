# Auth Skill Specification

## Purpose
JWT authentication using Better Auth for securing API endpoints and ensuring user identity verification.

## Description
This skill handles authentication for API requests by validating JWT tokens from Authorization headers. It verifies tokens using BETTER_AUTH_SECRET and extracts user information for downstream processing.

## Inputs
- **Authorization Header**: Contains the JWT token in the format `Bearer <token>`

## Outputs
- **Authenticated User Object**: Contains user information (user_id, email, etc.) when authentication is successful
- **Error Response**: 401 Unauthorized when authentication fails

## Implementation Details
- Verify JWT token using BETTER_AUTH_SECRET
- Decode the token to extract user_id and other claims
- Return authenticated user object for successful verification
- Handle token expiration and invalid token scenarios

## Error Handling
- **401 Unauthorized**: When token is missing, invalid, or expired
- **Error Message**: Clear error message indicating authentication failure

## Usage in Phase-II APIs
- Apply to all protected endpoints in FastAPI backend
- Integrate with Better Auth for token validation
- Ensure consistent authentication across all API routes

## Usage in Phase-III MCP Tools
- Enable authentication for MCP tools that interact with user data
- Secure agent-to-agent communication using JWT tokens
- Maintain consistent authentication patterns across all services