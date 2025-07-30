-- Enable Row Level Security on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserCredential" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PasswordReset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WaitlistSignup" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Recipe" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "RecipeTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Vote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Bookmark" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Tried" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UsernameChange" ENABLE ROW LEVEL SECURITY;

-- User table policies
CREATE POLICY "Users can view their own profile" ON "User"
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON "User"
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON "User"
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow public read access to user profiles (for viewing other users)
CREATE POLICY "Public can view user profiles" ON "User"
    FOR SELECT USING (true);

-- Account table policies (NextAuth)
CREATE POLICY "Users can manage their own accounts" ON "Account"
    FOR ALL USING (auth.uid() = "userId");

-- Session table policies (NextAuth)
CREATE POLICY "Users can manage their own sessions" ON "Session"
    FOR ALL USING (auth.uid() = "userId");

-- UserCredential table policies
CREATE POLICY "Users can manage their own credentials" ON "UserCredential"
    FOR ALL USING (auth.uid() = "userId");

-- PasswordReset table policies
CREATE POLICY "Users can manage their own password resets" ON "PasswordReset"
    FOR ALL USING (auth.uid() = "userId");

-- WaitlistSignup table policies - allow public insert, admin read
CREATE POLICY "Anyone can sign up for waitlist" ON "WaitlistSignup"
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view waitlist" ON "WaitlistSignup"
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM "User" 
            WHERE "User".id = auth.uid() 
            AND "User".role = 'ADMIN'
        )
    );

-- Recipe table policies
CREATE POLICY "Public can view all recipes" ON "Recipe"
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own recipes" ON "Recipe"
    FOR INSERT WITH CHECK (auth.uid() = "authorId");

CREATE POLICY "Users can update their own recipes" ON "Recipe"
    FOR UPDATE USING (auth.uid() = "authorId");

CREATE POLICY "Users can delete their own recipes" ON "Recipe"
    FOR DELETE USING (auth.uid() = "authorId");

-- Allow admins to manage all recipes
CREATE POLICY "Admins can manage all recipes" ON "Recipe"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "User" 
            WHERE "User".id = auth.uid() 
            AND "User".role = 'ADMIN'
        )
    );

-- Tag table policies - public read, admin write
CREATE POLICY "Public can view all tags" ON "Tag"
    FOR SELECT USING (true);

CREATE POLICY "Only admins can manage tags" ON "Tag"
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM "User" 
            WHERE "User".id = auth.uid() 
            AND "User".role = 'ADMIN'
        )
    );

-- RecipeTag table policies - public read, system write
CREATE POLICY "Public can view recipe tags" ON "RecipeTag"
    FOR SELECT USING (true);

CREATE POLICY "System can manage recipe tags" ON "RecipeTag"
    FOR ALL USING (true); -- This allows our application to manage tags

-- Vote table policies
CREATE POLICY "Public can view all votes" ON "Vote"
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own votes" ON "Vote"
    FOR ALL USING (auth.uid() = "userId");

-- Bookmark table policies
CREATE POLICY "Users can view their own bookmarks" ON "Bookmark"
    FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "Users can manage their own bookmarks" ON "Bookmark"
    FOR ALL USING (auth.uid() = "userId");

-- Tried table policies
CREATE POLICY "Users can view their own tried recipes" ON "Tried"
    FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "Users can manage their own tried recipes" ON "Tried"
    FOR ALL USING (auth.uid() = "userId");

-- UsernameChange table policies
CREATE POLICY "Users can view their own username changes" ON "UsernameChange"
    FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "Users can manage their own username changes" ON "UsernameChange"
    FOR ALL USING (auth.uid() = "userId"); 