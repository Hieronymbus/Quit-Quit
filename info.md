<<<Addiction quiting assist APP>>>


https://excalidraw.com/


<User-Stories & Acceptance-Criteria>

1.  As a user,
    I want to be able to register and log in with email or username + password so that i have access to my personalzed dashboard.
   
    AC:
       - Landing page must have a login form for username/email + password.
       - The system must validate the credentials against stored user data.

       - There must be an option to click and navigate to a registratin form for new users.
       - the registration form should have fields for Username, Email, Password.
       - on registration the user data should be stored in db and redirected to the login form
        
       - The system must validate the credentials against stored user data.
       - if login succesfull user should be redirected to there dashboard with a auth token provided.

2. As a user,
   I want to create a new quit goal by entering details about my addiction and recording a video to myself,
   so that I can track my progress and stay motivated in the future.

   AC:   
       - User can enter addiction type, duration, frequency, and money spent.
         Optional text field for reasons to quit.
         Video Recording:

       - Option to record or upload a video (up to 2 minutes).
         Skipping the video prompts a confirmation message.
         Validation & Submission:

       - All mandatory fields must be completed. 
         Show success or error messages based on submission status.
         Access & Playback:
 
       - Save all data and video for tracking in the dashboard.
         Allow video playback with a motivational reminder.

3. As a user,
   I want a new motivational quote to display on my dashboard every day,
   so that I can feel inspired and encouraged throughout my journey.

   AC:
       - A new motivational quote must appear on the dashboard every day at 12:00 AM (user's local time).

       - Quotes must be randomly selected from a pre-defined database or API without repeating within a week.

       - If the quote fails to load (e.g., network error), display a fallback default quote.

       - Ensure the quote is visually distinct and easy to read on the dashboard.

4. As a user,
   I want access to medical/expert advice related to what I’m quitting,
   so that I can better understand and manage the challenges of quitting.

   AC:
       - Users must see a "Get Advice" button 
       - Clicking the button must display relevant advice based on the addiction type (e.g., smoking, alcohol).
       - Advice must include:
            - Common withdrawal symptoms.
            - Tips for coping.
            - Links to trusted resources (e.g., hotlines, articles, support groups).
       - Ensure advice is categorized clearly and updated regularly.
       - If the user’s addiction type is not supported, display a generic message: "More information will be added soon. Check back later."    

5. As a user, 
   I want an achievements/progress section with milestones like money saved, time since quitting, and health improvements, 
   so that I can stay motivated and track tangible benefits beyond the hardest part.

   AC: 
       - Display milestones for money saved, time since quitting (e.g., "1 week", "6 months"), 
         and health improvements tailored to the addiction type (e.g., "lung function improved," "THC reduced by 50%").  
       - Update progress dynamically with a dashboard showing real-time calculations.
       - At 6 months, display a congratulatory message and ongoing motivational advice.
           
6. As a user, at the end of 6 months, I want to be prompted to add my feelings and experience to a pool of anonymous quit stories and have a way to view these stories, 
   so that I can reflect on my journey and provide info to others.

   AC: 
       - At the 6-month milestone, prompt the user with an option to share their story anonymously, including how they feel, how the journey went, and life post-quitting.
       - Allow users to view a collection of anonymous quit stories within the app.
       - Include an option for users to flag inappropriate content in the story pool.