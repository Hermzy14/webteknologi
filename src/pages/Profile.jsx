import React, { useState, useEffect } from "react";
import "../css/global-styles.css";
import "../css/profile.css";
import ImageNotFound from '../assets/Image-not-found.png';

function ProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const mockUserData = {
            name: 'John Doe',
            email: 'john@example.com',
        };
        setProfile({...mockUserData, password: ''});
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile updated:", profile);
        alert("Profile updated successfully!");
    };

    return (
        <>
            <main id="Profile">
                <section id="profile-information">
                    <h1>Profile</h1>
                    <div className="profile-container">
                        <div className="Profile-picture">
                            <img src={ImageNotFound} alt="Profile" />
                            <button>Change Photo</button>
                        </div>
                        <div className="Profile-details">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={profile.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter new password to change"
                                    />
                                </div>
                                <button type="submit" className="save-button">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </section>

                <section id="my-courses">
                    <h1>My courses</h1>
                    <div className="courses-list">
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