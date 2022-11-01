import styled from "styled-components";
import Header from "components/header";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <PageTitle>Next App</PageTitle>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;

const PageTitle = styled.h1`
  width: 1px;
  height: 1px;
  overflow: hidden;
  position: absolute;
`;
