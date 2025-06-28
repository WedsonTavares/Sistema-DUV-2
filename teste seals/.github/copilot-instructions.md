# Processo Seletivo Seals 2025 - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context

This is a fullstack application for the Seals Solutions 2025 recruitment challenge. The project consists of:

- **Backend**: Node.js/Express API with SQLite database
- **Frontend**: React/TypeScript application
- **Domain**: Ship voyage management system (DUVs - Documentos Únicos Virtuais)

## Key Entities

1. **DUV**: Virtual Unique Document representing a ship voyage
2. **Navio**: Ship used in the voyage  
3. **Pessoa**: Person (passenger or crew member)
   - Passengers: regular travelers
   - Crew members: have SID (Seafarers' Identity Document)

## Code Guidelines

### Backend (Node.js/Express)
- Use CommonJS modules
- Follow RESTful API conventions
- Use SQLite with raw SQL queries
- Implement proper error handling
- Use UUID for primary keys

### Frontend (React/TypeScript)
- Use TypeScript strictly
- Implement proper type definitions
- Use functional components with hooks
- Follow React best practices
- Use CSS modules for styling
- Implement loading states and error handling

### Database
- SQLite relational database
- Foreign key constraints
- Junction table for many-to-many relationships
- Proper indexing for performance

## Business Rules
- Each DUV belongs to one ship
- Each DUV can have multiple people
- People can be in multiple DUVs
- Crew members are distinguished by having a SID
- Visual separation between passengers and crew in UI

## API Endpoints Pattern
- `/api/duvs` - DUV operations
- `/api/navios` - Ship operations  
- `/api/pessoas` - People operations

Always maintain consistency with Portuguese terminology as this is a Brazilian project.
