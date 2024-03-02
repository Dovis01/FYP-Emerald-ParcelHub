import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Box, ButtonBase, Collapse, Icon} from '@mui/material';
import {useState} from "react";
import {SideNavItemSubButton} from "@/components/navigation/sideNavItemSubButton";
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import * as React from "react";
import {usePathname} from "next/navigation";

export const SideNavItemButton = (props) => {
    const {active = false, disabled, external, icon, path, title, children} = props;
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const linkProps = path
        ? external
            ? {
                component: 'a',
                href: path,
                target: '_blank'
            }
            : {
                component: NextLink,
                href: path
            }
        : {};

    const handleClick = () => {
        if (children) {
            setOpen(!open);
        }
    };

    return (
        <li>
            <ButtonBase
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '12px',
                    pr: '16px',
                    py: '6.9px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
                {...linkProps}
                onClick={handleClick}
            >
                {icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 1,
                            ...(active && {
                                color: 'primary.main'
                            })
                        }}
                    >
                        {icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 15.5,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'common.white'
                        }),
                        ...(disabled && {
                            color: 'neutral.500'
                        })
                    }}
                >
                    {title}
                </Box>
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.400',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        ml: 1
                    }}
                >
                    <Icon
                        size="small"
                        sx={{
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: (theme) => theme.transitions.create('transform', {
                                duration: theme.transitions.duration.shortest,
                            }),
                            ...(children && children.length > 0 ? {} : {visibility: 'hidden'}) // Hide the icon if there are no children
                        }}
                    >
                            <ExpandMoreRoundedIcon/>
                    </Icon>
                </Box>
            </ButtonBase>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children && children.map((child) => {
                    const active = child.path ? (pathname === child.path) : false;
                    return (
                        <SideNavItemSubButton
                            active={active}
                            disabled={child.disabled}
                            external={child.external}
                            icon={child.icon}
                            key={child.title}
                            path={child.path}
                            title={child.title}
                        />
                    );
                })}
            </Collapse>
        </li>
    );
};

SideNavItemButton.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    external: PropTypes.bool,
    icon: PropTypes.node,
    path: PropTypes.string,
    children: PropTypes.array,
    title: PropTypes.string.isRequired
};
