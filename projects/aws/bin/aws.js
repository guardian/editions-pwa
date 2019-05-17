#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/cdk");
const aws_stack_1 = require("../lib/aws-stack");
const app = new cdk.App();
new aws_stack_1.EditionsStack(app, 'EditionsStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxvQ0FBcUM7QUFDckMsZ0RBQWlEO0FBRWpELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUkseUJBQWEsQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY2RrJyk7XG5pbXBvcnQgeyBFZGl0aW9uc1N0YWNrIH0gZnJvbSAnLi4vbGliL2F3cy1zdGFjayc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgRWRpdGlvbnNTdGFjayhhcHAsICdFZGl0aW9uc1N0YWNrJyk7XG4iXX0=