import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the platform headline and chapter navigation", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /read like a book/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Chapters$/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Internal Tables/i).length).toBeGreaterThan(0);
  });
});
