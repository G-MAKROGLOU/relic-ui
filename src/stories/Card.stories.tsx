import React from "react";
import { Story } from "@storybook/react";
import { Card, CardProps } from "../components/Card/Card";
import {MdOutlineAddShoppingCart} from 'react-icons/md'

const CustomCardFooter = () => {

    const styles = {
        footerContainer: {paddingBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}
    }

    return (
        <div style={styles.footerContainer}>
            <MdOutlineAddShoppingCart
                onClick={() => alert("Added to cart")} 
                className="example-footer-action"
            />
        </div>
    )
}

export default {
  title: "Card",
  component: Card,
};

const Template: Story<CardProps> = args => <Card {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
    imageSrc: "https://www.ubuy.com.gr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzE3amZXSW42dEwuX0FDX1NMMTUwMF8uanBn.jpg",
    title: "IPhone 12 Pro MAX",
    description: "This is a very very very very very very very very very very very very very very very very very very very very very veryvery very very very very very very very very very very veryvery very very veryvery  long description for the card example",
    footer: <CustomCardFooter/>
};
