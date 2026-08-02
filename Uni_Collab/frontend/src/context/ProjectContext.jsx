import { createContext, useState, useEffect } from "react";
import initialProjects from "../data/projects";

export const ProjectContext = createContext();


export function ProjectProvider({ children }) {


    const [projects, setProjects] = useState(() => {
        return JSON.parse(localStorage.getItem("projects")) || initialProjects;
    });

    const [applications, setApplications] = useState(() => {
        return JSON.parse(localStorage.getItem("applications")) || [];
    });

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem("applications", JSON.stringify(applications));
    }, [applications]);

    function addProject(project) {

        setProjects(prev => [
            ...prev,
            project
        ]);

    }

    function deleteProject(projectId) {

        setProjects(prev =>
            prev.filter(project => project.id !== projectId)
        );

    }

    function addApplication(application) {

        setApplications(prev => [

            ...prev,
            application

        ]);

    }


    return (

        <ProjectContext.Provider

            value={{

                projects,
                addProject,
                deleteProject,

                applications,
                addApplication

            }}

        >

            {children}

        </ProjectContext.Provider>

    );

}