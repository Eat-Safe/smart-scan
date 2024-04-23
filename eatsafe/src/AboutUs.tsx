import React, { useState } from "react";
import Header from "./components/Header";
import "./AboutUs.css";

function AboutUs() {
  const [isTeamVisible, setTeamVisible] = useState(false);

  const toggleTeamVisibility = () => {
    setTeamVisible(!isTeamVisible);
  };

  return (
    <div className="App">
      <Header />
      <div className="about-us-content">
        <h1 className="about-us-title"> <strong>About Us</strong></h1>
        <section>
          {/* Mission statement inside a styled div */}
          <div className="mission-statement-box">
            <h2>Our Mission</h2>
            <p>At Eat-Safe Smart Scan, our mission is to enhance food safety and empower individuals with dietary restrictions by providing a user-friendly, tech-driven solution for allergen detection. We are dedicated to improving the dining experience for everyone, especially those with food allergies, sensitivities, and dietary preferences. By leveraging cutting-edge technology and intuitive design, we aim to deliver accurate, accessible, and immediate allergen analysis. Our goal is to create a safer, more informed food consumption environment where individuals can make confident eating choices.</p>
          </div>
        </section>
        <section>
          <div className="team-title-container">
            <div className="team-title-box" onClick={toggleTeamVisibility}>
              <h2 className= "our-team-title">Meet Our Team!</h2>
            </div>
          </div>
          {isTeamVisible && (
            <div className="team-box-containner">
              <div className="team-box">
                <div className="team-member">
                  <h2>Zonera Nasir</h2>
                  <h4><i>Product Manager</i></h4>
                  <p>I'm Zonera Nasir, a recent computer science graduate from MSU Denver, now a frontend engineer with aspirations of becoming a Product Manager. As the product manager for a senior project, I led a team in developing a user-friendly website tailored to simplify the lives of allergy sufferers. Our goal was to eliminate the confusion often found in allergy apps by providing intuitive navigation and a straightforward interface. Through our project, we aim to make a meaningful impact and enhance the lives of those with allergies using technology.</p>
              </div>
              <div className="team-member">
                <h2>Joaquin Trujillo</h2>
                <h4><i>Scrum Master</i></h4>
                <p>My name is Joaquin R. Trujillo, and I am a computer science major with a minor in Mathematics. My contributions included working on the buttons and layout of the camera. Additionally, I assisted with organizing the team and hosting our React project. I am passionate about developing applications and software that contribute to a better society. I thrive in collaborative environments and have a strong enthusiasm for sports!</p>
              </div>
              <div className="team-member">
                <h2>Gabriela Esquibel</h2>
                <p>My name is Gabriella and I am majoring in Computer Science with a minor in Math. My contributions to this product include tesseract.js, a software that adds the ability to detect words from an image. I also implemented the camera functionality which gives our app the ability to use the information from your image to detect allergens. I am passionate about software development and excited for you to use our product!</p>
              </div>
              <div className="team-member">
                <h2>Brenda Castellanos</h2>
                <p>I’m Brenda Castellanos, a computer science major and mathematics minor. My contributions included frontend coding. As the lead designer and frontend developer I helped shape the user experience and visual identity of our web application. I was able to translate design concepts into functional components, bringing the app to life with responsive and intuitive features. I am passionate about creating an engaging and user-friendly experience, enhancing accessibility and usability for all users!</p>
              </div>
              <div className="team-member">
                <h2>Haimei Chen</h2>
                <p>My name is Haimei Chen, and my major is Computer Science. My contribution to our React project focuses on enhancing the interface and interactivity aspects. I played a role in integrating the OCR functionality and refining the algorithm for detecting allergens. This feature now enables our application to accurately identify allergens from product images, thereby assisting individuals with allergies. I'm deeply committed to building software that not only meets user needs but also makes a positive impact on the community. Working collaboratively with my team, we strive to bring innovative solutions that make our digital environment more inclusive and safe for everyone.</p>
              </div>
              {/* Repeat the above structure for each team member */}
            </div>
          </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AboutUs;

