import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Home } from "../../_pages/Home";
import { MemoryRouter } from "react-router";
import type { PropertyWithOwnerImage } from "../../_types/property";

const mockProperties: PropertyWithOwnerImage[] = [
  {
    idProperty: "1",
    name: "House One",
    firstImage: "",
    ownerName: "John",
    address: "",
    price: 0,
    year: 0,
  },
  {
    idProperty: "2",
    name: "House Two",
    firstImage: "",
    ownerName: "Anna",
    address: "",
    price: 0,
    year: 0,
  },
];

let mockGetPropertiesImpl: any = undefined;

vi.mock("../../_services/property", () => ({
  getProperties: (...args: any[]) => mockGetPropertiesImpl(...args),
}));

function renderHome(options?: { initialEntries?: string[] }) {
  return render(
    <MemoryRouter initialEntries={options?.initialEntries}>
      <Home />
    </MemoryRouter>
  );
}

mockGetPropertiesImpl = (params?: URLSearchParams) => {
  const page = parseInt(params?.get("page") || "1");
  const pageSize = parseInt(params?.get("pageSize") || "12");
  const name = params?.get("name") || "";
  let items = mockProperties;
  if (name === "House") {
    items = [mockProperties[0]];
  }
  const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);
  return Promise.resolve({ items: pagedItems, total: items.length });
};

describe("Home page", () => {
  it("renders main title and description", async () => {
    renderHome();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByText(/Exclusive Properties/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Discover unparalleled luxury residences/i)
    ).toBeInTheDocument();
  });

  it("shows properties from getProperties service", async () => {
    renderHome();
    expect(await screen.findByText("House One")).toBeInTheDocument();
    expect(await screen.findByText("House Two")).toBeInTheDocument();
  });

  it("shows no properties available when service returns empty", async () => {
    mockGetPropertiesImpl = () => Promise.resolve({ items: [], total: 0 });
    renderHome();
    expect(
      await screen.findByText(/No properties available/i)
    ).toBeInTheDocument();
  });

  it("handles filters by URL (name)", async () => {
    mockGetPropertiesImpl = (params: any) => {
      const page = parseInt(params?.get("page") || "1");
      const pageSize = parseInt(params?.get("pageSize") || "12");
      const name = params?.get("name") || "";
      let items: PropertyWithOwnerImage[] = [];
      if (name === "House") {
        items = [mockProperties[0]];
      }
      const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);
      return Promise.resolve({ items: pagedItems, total: items.length });
    };
    renderHome({ initialEntries: ["/?name=House"] });
    expect(await screen.findByText("House One")).toBeInTheDocument();
    expect(screen.queryByText("House Two")).not.toBeInTheDocument();
  });

  it("handles pagination by URL", async () => {
    mockGetPropertiesImpl = (params: any) => {
      const page = parseInt(params?.get("page") || "1");
      const pageSize = parseInt(params?.get("pageSize") || "12");
      const items = mockProperties;
      const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);
      return Promise.resolve({ items: pagedItems, total: items.length });
    };
    renderHome({ initialEntries: ["/?page=2&pageSize=1"] });
    expect(await screen.findByText("House Two")).toBeInTheDocument();
    expect(screen.queryByText("House One")).not.toBeInTheDocument();
  });
});
