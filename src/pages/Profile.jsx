import React from "react";
import "../css/global-styles.css";

/**
 * Component representing the profile page of the application.
 * It contains profile information section and a My Courses section.
 * @return {JSX.Element} The rendered component.
 */
function ProfilePage() {

    return (
        <>
        {/* Main content */}
        <main>
            <section id="profile-information">
                <h1>Profile</h1>
                <div className ="Profile-picture">
                    <img src="https://via.placeholder.com/150" alt="Profile" />
                </div>
                <div className="Profile-details">
                    {/* put in name emial and password boxes */}
                </div>
            </section>

            <section id="my-courses">
                <h1>My courses</h1>
                <div className ="courses-list">
                    <div className="course-item">
                        <h2>Course Title</h2>
                        <p>Course Description</p>
                        <button className="remove-button">Remove</button>
                    </div>
                </div>
            </section>

        </main>
        </>
    );
}

export default ProfilePage;