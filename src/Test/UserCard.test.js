import { render, screen } from "@testing-library/react";
import Card from "../components/Card";

test("UserCard component renders correctly", () => {
    // Render the UserCard component with test props
    render(<Card firstName="Balusu" lastName="Saikrishna" age="27" about="Software Developer" skills={["JavaScript", "React"]} gender="Male" profileUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSod40hkwNefKtys4mkJrrAlB8-wFc4rafHfw&s" showButton={true} />)
    // Use assertions to check if the component renders the expected content
    const btn = screen.getByText("Interested");
    expect(btn).toBeInTheDocument();
    const nameElement = screen.getByText("Balusu Saikrishna");
    expect(nameElement).toBeInTheDocument();
    const ageGenderElement = screen.getByText("27");
    expect(ageGenderElement).toBeInTheDocument();
    const skillsElement = screen.getByText("JavaScript, React");
    expect(skillsElement).toBeInTheDocument();
    const aboutElement = screen.getByText("Software Developer");
    expect(aboutElement).toBeInTheDocument();
})