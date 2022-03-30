import React from "react";
import { Story } from "@storybook/react";
import { Table, TableProps } from "../components/Table/Table";


export default {
  title: "Table",
  component: Table,
};

const Template: Story<TableProps> = args => <Table {...args} />;

export const SimpleTable = Template.bind({});
SimpleTable.args = {
    columns: [
        {
            label: "Username",
            index: "uname",
            key: 1
        },
        {
            label: "Email",
            index: "email",
            key: 2
        },
        {
            label: "Firstname",
            index: "fName",
            key: 3
        },
        {
            label: "Lastname",
            index: "lName",
            key: 4
        },
        {
            label: "Age",
            index: "age",
            key: 5
        },
        {
            label: "Address",
            index: "address",
            key: 6
        }
    ],
    rows: [
        {
            "uname": "JDoe",
            "email": "test@gmail.com",
            "fName": "John",
            "lName": "Doe",
            "age": 30,
            "address": "Example Str. 158"
        },
        {
            "uname": "JaneDoe",
            "email": "test@outlook.com",
            "fName": "Jane",
            "lName": "Doe",
            "age": 25,
            "address": "Example Str. 158"
        },
        {
            "uname": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "email": "test@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com",
            "fName": "aaaaaaaaaaaaaaaaaaaaaaaaa",
            "lName": "aaaaaaaaaaaaaaaaaaaaaaaaa",
            "age": 25,
            "address": "Example Str. 158"
        }
    ]
};

