import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLogOut } from "../../context/LogOutContext";
import { toast } from "react-toastify";
import {
  BoxArrowUpRight,
  FileEarmarkPdf,
  Download,
} from "react-bootstrap-icons";

import "./ProfileSection.css";

const ProfileSection = () => {
  const [studentObj, setStudentObj] = useState(null);
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [searchParams] = useSearchParams();
  const studentUSN = searchParams.get("studentUSN");

  const { user } = useLogOut();
  const API_URL = import.meta.env.VITE_API_URL;

  const canEdit =
    user?.role === "registeredStuds" && user?.USN === studentObj?.USN;

  // Fetch student details
  useEffect(() => {
    if (!studentUSN) return;

    let active = true;

    setStudentObj(null);
    setIsEditing(false);

    fetch(`${API_URL}/api/students/${encodeURIComponent(studentUSN)}`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch student");
        return res.json();
      })
      .then((data) => {
        if (active) setStudentObj(data);
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, [studentUSN, API_URL]);

  // Start editing
  const startEditing = () => {
    setDraft({
      name: studentObj.name || "",
      email: studentObj.email || "",
      website: studentObj.website || "",
      phoneNumber: studentObj.phoneNumber || "",
      skills: (studentObj.skills || []).join(", "),
      resumes: (studentObj.resumes || []).join("\n"),
      socialContacts: {
        whatsapp: studentObj.socialContacts?.whatsapp || "",
        linkedIn: studentObj.socialContacts?.linkedIn || "",
      },
      Projects: (studentObj.Projects || []).map((project) => ({
        title: project.title || "",
        GitHub_Repo: project.GitHub_Repo || "",
        deployLink: project.deployLink || "",
      })),
    });

    setIsEditing(true);
  };

  // Update simple fields
  const updateField = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update social contacts
  const updateSocial = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      socialContacts: {
        ...prev.socialContacts,
        [field]: value,
      },
    }));
  };

  // Update project
  const updateProject = (index, field, value) => {
    setDraft((prev) => ({
      ...prev,
      Projects: prev.Projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project,
      ),
    }));
  };

  // Save profile
  const handleSave = async (event) => {
    event.preventDefault();

    if (!canEdit || saving) return;

    const updates = {
      name: draft.name.trim(),
      email: draft.email.trim(),
      website: draft.website.trim(),
      phoneNumber: draft.phoneNumber.trim(),

      skills: draft.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),

      resumes: draft.resumes
        .split("\n")
        .map((link) => link.trim())
        .filter(Boolean),

      socialContacts: {
        whatsapp: draft.socialContacts.whatsapp.trim(),
        linkedIn: draft.socialContacts.linkedIn.trim(),
      },

      Projects: draft.Projects.map((project) => ({
        title: project.title.trim(),
        GitHub_Repo: project.GitHub_Repo.trim(),
        deployLink: project.deployLink.trim(),
      })).filter(
        (project) => project.title || project.GitHub_Repo || project.deployLink,
      ),
    };

    setSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/api/students/${encodeURIComponent(studentUSN)}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setStudentObj((prev) => ({
        ...prev,
        ...updates,
      }));

      setIsEditing(false);
      setDraft(null);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    boxSizing: "border-box",
  };

  if (!studentObj) return null;

  return (
    <form className="profile-section" onSubmit={handleSave}>
      <div className="profile-left">
        <h2 className="component-name">Profile</h2>

        {/* Edit / Save / Cancel */}
        {canEdit &&
          (isEditing ? (
            <div>
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setIsEditing(false);
                  setDraft(null);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" onClick={startEditing}>
              Edit Profile
            </button>
          ))}

        {/* Name */}
        <label className="info-label" htmlFor="student-name">
          Name
        </label>

        {isEditing ? (
          <input
            id="student-name"
            style={inputStyle}
            value={draft.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        ) : (
          <h2 className="student-name" id="student-name">
            {studentObj.name}
          </h2>
        )}

        {/* USN - Never editable */}
        <label className="info-label">USN</label>
        <p className="student-usn">{studentObj.USN}</p>

        {/* Website */}
        <label className="info-label" htmlFor="student-website">
          Website
        </label>

        {isEditing ? (
          <input
            id="student-website"
            type="url"
            style={inputStyle}
            value={draft.website}
            onChange={(e) => updateField("website", e.target.value)}
          />
        ) : (
          studentObj.website && (
            <a
              href={studentObj.website}
              target="_blank"
              rel="noopener noreferrer"
              id="student-website"
            >
              Portfolio <BoxArrowUpRight className="icon-style" />
            </a>
          )
        )}

        {/* Skills */}
        <div className="profile-skills">
          <h2>Skills</h2>

          {isEditing ? (
            <input
              style={inputStyle}
              placeholder="React, Node.js, MongoDB"
              value={draft.skills}
              onChange={(e) => updateField("skills", e.target.value)}
            />
          ) : (
            <ul className="skills-list">
              {(studentObj.skills || []).map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Resumes */}
        <label className="info-label">Resumes</label>

        {isEditing ? (
          <textarea
            style={inputStyle}
            rows={4}
            placeholder="One resume URL per line"
            value={draft.resumes}
            onChange={(e) => updateField("resumes", e.target.value)}
          />
        ) : (
          <div className="resumes-container">
            <ul className="resumes-list">
              {(studentObj.resumes || []).map((link, index) => (
                <li className="resume-item" key={index}>
                  <FileEarmarkPdf className="resume-icon" />

                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-link"
                  >
                    Resume {index + 1}
                  </a>

                  <Download className="download-icon" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Details */}
        <div className="contact-details">
          {isEditing ? (
            <>
              <label className="info-label">Email</label>
              <input
                type="email"
                style={inputStyle}
                value={draft.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
              />

              <label className="info-label">WhatsApp</label>
              <input
                style={inputStyle}
                value={draft.socialContacts.whatsapp}
                onChange={(e) => updateSocial("whatsapp", e.target.value)}
              />

              <label className="info-label">LinkedIn</label>
              <input
                style={inputStyle}
                value={draft.socialContacts.linkedIn}
                onChange={(e) => updateSocial("linkedIn", e.target.value)}
              />

              <label className="info-label">Mobile</label>
              <input
                type="tel"
                style={inputStyle}
                value={draft.phoneNumber}
                onChange={(e) => updateField("phoneNumber", e.target.value)}
              />
            </>
          ) : (
            <>
              <a href={`mailto:${studentObj.email}`}>Email</a>

              {studentObj.socialContacts?.whatsapp && (
                <a
                  href={studentObj.socialContacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              )}

              {studentObj.socialContacts?.linkedIn && (
                <a
                  href={studentObj.socialContacts.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}

              <label className="info-label">Mobile</label>

              <a href={`tel:${studentObj.phoneNumber}`}>
                {studentObj.phoneNumber}
              </a>
            </>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="profile-right">
        <div className="profile-projects">
          <h2>Projects</h2>

          {isEditing ? (
            <>
              {draft.Projects.map((project, index) => (
                <div className="project-item" key={index}>
                  <label className="info-label">Project Title</label>

                  <input
                    style={inputStyle}
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                  />

                  <label className="info-label">GitHub URL</label>

                  <input
                    type="url"
                    style={inputStyle}
                    value={project.GitHub_Repo}
                    onChange={(e) =>
                      updateProject(index, "GitHub_Repo", e.target.value)
                    }
                  />

                  <label className="info-label">Live Demo URL</label>

                  <input
                    type="url"
                    style={inputStyle}
                    value={project.deployLink}
                    onChange={(e) =>
                      updateProject(index, "deployLink", e.target.value)
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      updateField(
                        "Projects",
                        draft.Projects.filter((_, i) => i !== index),
                      )
                    }
                  >
                    Remove Project
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() =>
                  updateField("Projects", [
                    ...draft.Projects,
                    {
                      title: "",
                      GitHub_Repo: "",
                      deployLink: "",
                    },
                  ])
                }
              >
                + Add Project
              </button>
            </>
          ) : (
            <ul>
              {(studentObj.Projects || []).map((project, index) => (
                <li key={index}>
                  <div className="project-item">
                    <h3>{project.title}</h3>

                    <div className="project-links">
                      {project.GitHub_Repo && (
                        <a
                          href={project.GitHub_Repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          GitHub Repo
                        </a>
                      )}

                      {project.deployLink && (
                        <a
                          href={project.deployLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-btn"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileSection;
