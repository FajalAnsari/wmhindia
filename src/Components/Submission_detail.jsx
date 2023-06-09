import React, { useState } from "react";

const SubmissionDetails = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card bg-dark text-light mx-auto">
      <div className="card-body">
        <h5 className="card-title">Submission Details</h5>
        <p className="card-text">
          <h6>Dates</h6>
          Deadline: June 15, 2023 at 11:59 PM EDT<br />
          Decision date: 14 days after submission<br />
          Publish date: June 21, 2023<br />
          Exclusivity: July 15, 2023
          {expanded && (
            <>
              <br /><br />
              <h6>Image Requirements</h6>
              5-10 images | JPG format | sRGB Color profile | At least 1600 pixels on the longest side | Must be exclusive and unpublished | Copyright owner only<br /><br />
              <h6>Guidelines</h6>
              Theme for this edition: Exploring the theme of Indian artisans and fashion, this edition celebrates the fusion of traditional craftsmanship and contemporary designs, showcasing the rich heritage and vibrant traditions of India.<br /><br />
              <li>MODELS UNDER 18 REQUIRE TO COMPLETE THE CONSENT FORM WITH CONFIRMATION FROM THE PARENTS.</li>
              <li>Follow us on Instagram @wmh_in</li>
              <li>All images must be retouched and edited.</li>
              <li>Please send at least 5 photos for web submissions to be considered!</li>
              <li>The submissions that are accepted will be shared on our website and on our social media inclusive of Facebook, Twitter, Instagram, and more.</li>
              <li>Please include full team credits along with @IG usernames to be properly credited and include any other website links to be credited.</li>
              <li>Additionally, our team will verify the submissions on our own platform.</li>
              <li>We would adore a little bio about you and a sentence about the shoot/meaning.</li>
              <li>Pictures don't have to be exclusive! (*allowed on social media) However, they ought to not be published!</li>

              <br/><h6>IMPORTANT NOTE:</h6>
              <li>Attention! Please review the team and wardrobe credits very carefully. If you see a mistake. Please double-check the credits before submitting your work.</li>
              <li>Any changes in credits post magazine release will be charged at $49.99.</li>
              <li>All pictures and writings you submit as a contributor to World Model Hunt India Magazine must be free of any copyright restrictions. All of the submitted works must be original creations of yours, and you must be the legitimate owner of the copyright. You and the included subjects, people, or models agree to provide world model Magazine permission to publish your work and utilise your image after it has been submitted. Your eligibility will be immediately terminated if any submission(s) are connected to any copyright entanglement as a result of the aforementioned.</li>
              <li>You give World Model Hunt's WMH India Magazine permission to use your work in our website, videos, marketing materials, advertisements, and any other formats or mediums used in the production and monetization of World Model Hunt India Magazine's content by permitting us to publish your work.</li><br/>
              By submitting to World Model Hunt's WMH India magazine, you agree to the above terms and agreements.<br/><br/>

              Thank you!<br/>

World Model Hunt India Magazine Team

            </>
          )}
        </p>
        <button className="btn btn-link bg-danger text-light" onClick={handleExpand}>
          {expanded ? "Read less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default SubmissionDetails;