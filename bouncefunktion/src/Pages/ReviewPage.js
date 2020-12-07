import NavbarContainer from '../Containers/Navbar/NavbarContainer';
const ReviewPage = (props) => {
  /**
   * The review page is going to be a look back at the weekly stats. I want this page to keep content engagement with the bounce funktion exciting
   *
   * What will we compare?
   * * General stats *
   * - Number of posts this week
   * - Top genre
   * - Top Track (aka most liked)
   * - Hottest discussion (most comments on a track)
   * - Biggest contributor (number of posts)
   * - Most supportive (number of likes)
   *
   * * Personal stats *
   * - How many views your posts got
   * - How many likes you recieved
   * - How many posts you interacted with
   * - How many posts you favourited
   *
   * * Decisions to make *
   * Shall we update this throughout the week or should it be published every Sunday? - I think throughout the week
   * How will we gather the data?
   *
   * This looks like a good query to get the last Monday:
   * var prevMonday = new Date();
   * prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7);
   *
   * Number of Posts this week - Need a query that gets all posts after a certain date, that being the start of the week
   * Top Track - Need a query that looks through the posts after the previous monday and finds the one with the highest number of likes - not too difficult -- same for comments
   * Biggest contributor -- Could use username for now as we track that on the post
   * Highest number of likes - This is tougher, I guess we could save off the total number likes from users per week and then compare as we go?
   *
   *
   *
   * * Priortising objectives *
   * EASY
   * The shell of the page would be easily achievable
   * The number of posts per week
   * Top Track per week - just search for posts after a certain date and return the one with the highest likes
   * Biggest post contributor per week
   * Most commented on post
   *
   * MEDIUM
   * Most liked post - would need to create a new firebase node called 'likes' to track likes - this would provide a timestamp
   * Number of user likes and posts per week
   *
   * HARD
   * Post stats, like number of plays
   */

  return (
    <div>
      <NavbarContainer theme={props.theme} toggleTheme={props.themeToggler} />
      Review Page
    </div>
  );
};

export default ReviewPage;
