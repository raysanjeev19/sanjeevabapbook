import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

describe("Home", () => {
  it("renders the platform headline and chapter navigation", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Crack ABAP interviews/i })).toBeInTheDocument();
    expect(screen.getByText(/Digital Book Chapters/i)).toBeInTheDocument();
    expect(screen.getByText(/Internal Tables/i)).toBeInTheDocument();
  });
});
