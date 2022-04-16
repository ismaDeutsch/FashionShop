import styled from 'styled-components';
import { LineStyle, Report, WorkOutline, Timeline, ChatBubbleOutline, DynamicFeed, MailOutline, BarChart, TrendingUp, PersonOutline, Storefront, AttachMoney } from "@material-ui/icons";
import { Link } from "react-router-dom";


const Container = styled.div`
    flex:1;
    height:calc(100vh - 50px);
    background-color:rgb(251, 251, 255);
    position: sticky;
    top: 50px;
`;
const SideBarWrapper = styled.div`
    padding: 20px;
    color: #555;
`;
const SideBarMenu = styled.div`
    margin-bottom: 10px;
`;
const SideBarTitle = styled.h3`
    font-size: 13px;
    color: rgb(187, 186, 186);
`;
const SideBarList = styled.ul`
    list-style:none;
    padding: 5px;
`;
const SideBarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display:flex;
    align-items:center;
    border-radius: 10px;
    &:active, &:hover{
        background-color:rgb(240, 240, 250);
    };
    background-color:${props => !props.active } rgb(240, 240, 250);
`;
const StyleLink = styled(Link)`
    text-decoration: none;
    color:inherit;
`


function Sidebar() {
   
  return (
    <Container>
        <SideBarWrapper>
            <SideBarMenu>
                <SideBarTitle>DashBoard</SideBarTitle>
                <SideBarList>
                    <StyleLink to="/">
                        <SideBarListItem  active={true}>
                            <LineStyle style={{ marginRight: 5, fontSize: 20 }} />
                            Home
                        </SideBarListItem>
                    </StyleLink>
                    <SideBarListItem>
                        <Timeline style={{ marginRight: 5, fontSize: 20 }}/>
                        Analytics
                    </SideBarListItem>
                    <SideBarListItem>
                        <TrendingUp style={{ marginRight: 5, fontSize: 20 }}/>
                        Sales
                    </SideBarListItem>
                </SideBarList>

                <SideBarTitle>Quick Menu</SideBarTitle>
                <SideBarList>
                    <StyleLink to="/users">
                        <SideBarListItem>
                            <PersonOutline style={{ marginRight: 5, fontSize: 20}} />
                            Users
                        </SideBarListItem>
                    </StyleLink>
                    <StyleLink to="/products">
                        <SideBarListItem>
                            <Storefront style={{ marginRight: 5, fontSize: 20}}/>
                            Products
                        </SideBarListItem>
                    </StyleLink>
                    <SideBarListItem>
                        <AttachMoney style={{ marginRight: 5, fontSize: 20}}/>
                        Transactions
                    </SideBarListItem>
                    <SideBarListItem>
                        <BarChart style={{ marginRight: 5, fontSize: 20}}/>
                        Reports
                    </SideBarListItem>
                </SideBarList>

                <SideBarTitle>Notifications</SideBarTitle>
                <SideBarList>
                    <SideBarListItem>
                        <MailOutline style={{ marginRight: 5, fontSize: 20}} />
                        Mail
                    </SideBarListItem>
                    <SideBarListItem>
                        <DynamicFeed style={{ marginRight: 5, fontSize: 20}}/>
                        Feedback
                    </SideBarListItem>
                    <SideBarListItem>
                        <ChatBubbleOutline style={{ marginRight: 5, fontSize: 20}}/>
                        Messages
                    </SideBarListItem>
                </SideBarList>

                <SideBarTitle>Staff</SideBarTitle>
                <SideBarList>
                    <SideBarListItem>
                        <WorkOutline style={{ marginRight: 5, fontSize: 20}} />
                        Manage
                    </SideBarListItem>
                    <SideBarListItem>
                        <Timeline style={{ marginRight: 5, fontSize: 20}}/>
                        Analytics
                    </SideBarListItem>
                    <SideBarListItem>
                        <Report style={{ marginRight: 5, fontSize: 20}}/>
                        Reports
                    </SideBarListItem>
                </SideBarList>
            </SideBarMenu>
        </SideBarWrapper>
    </Container>
  )
}

export default Sidebar