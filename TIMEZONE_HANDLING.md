# Timezone Handling in Salon Booking System

## Overview
This document explains how timezone handling is implemented in the salon booking system to ensure consistent datetime handling across different timezones, particularly for users in Sri Lanka (UTC+5:30).

## Problem
When users in different timezones (like Sri Lanka) create bookings, the datetime values were not being handled consistently, causing confusion and incorrect booking times.

## Solution

### Frontend (React/Next.js)
1. **Local to UTC Conversion**: When creating/updating bookings, local datetime from the browser is converted to UTC before sending to the backend
2. **UTC to Local Conversion**: When displaying or editing bookings, UTC datetime from the backend is converted to local timezone for the user
3. **Display Formatting**: All datetime displays use the user's local timezone

### Backend (FastAPI)
1. **UTC Storage**: All datetime values are stored in UTC in the database
2. **Timezone Validation**: Incoming datetime values are validated and converted to UTC
3. **Past Date Prevention**: Bookings cannot be created or updated to past dates

## Implementation Details

### Frontend Utilities (`salone-frontend/src/utils/timezone.ts`)
- `convertLocalToUTC()`: Converts local datetime to UTC ISO string
- `convertUTCToLocal()`: Converts UTC datetime to local datetime-local format
- `formatDateTimeForDisplay()`: Formats UTC datetime for display in user's timezone
- `getCurrentLocalDateTime()`: Gets current local datetime
- `isPastDateTime()`: Checks if a datetime is in the past

### Backend Changes
- **Schema Validation**: Added Pydantic field validator for timezone-aware datetime
- **CRUD Operations**: All datetime operations convert to UTC before database storage
- **API Validation**: Added validation to prevent past date bookings

### Database
- All datetime fields store UTC values without timezone information
- Consistent storage format across all booking-related tables

## Usage Examples

### Creating a Booking
1. User selects local datetime in browser (e.g., "2024-01-15 14:30" in Sri Lanka)
2. Frontend converts to UTC: "2024-01-15T09:00:00.000Z"
3. Backend receives UTC datetime and stores it
4. When displayed, UTC is converted back to local timezone

### Displaying Bookings
1. Backend returns UTC datetime
2. Frontend converts to local timezone for display
3. User sees time in their local timezone

## Testing
To test timezone handling:
1. Create a booking in one timezone
2. View the booking in a different timezone
3. Verify the displayed time is correct for the local timezone

## Dependencies
- **Frontend**: No additional dependencies (uses built-in JavaScript Date methods)
- **Backend**: `pytz==2024.1` for timezone handling

## Notes
- The system assumes all incoming datetime values without timezone info are UTC
- All database storage is in UTC
- Display is always in the user's local timezone
- Past date validation prevents booking in the past 