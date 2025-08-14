import { useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoSvg from '../assets/logo.svg';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  name: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', path: '/' },
  { name: 'Builder', path: '/builder' },
  { name: 'Chart', path: '/chart' },
];

const SOCIAL_ITEMS: NavItem[] = [
  { name: 'DOCS', path: 'https://www.gitbook.com/' },
  { name: 'TELEGRAM', path: 'https://telegram.org/' },
  { name: 'X', path: 'https://twitter.com/' },
];

/**
 * Navbar component
 *
 * A responsive navigation bar component that adapts to different screen sizes.
 * Displays horizontal navigation on desktop and drawer navigation on mobile.
 * Follows our component architecture pattern.
 */
export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { login, loading, tokens, error } = useAuth();
  const authDisabled = import.meta.env.VITE_DISABLE_AUTH === 'true';
  const isDev = import.meta.env.DEV;

  // Development environment indicator
  const DevIndicator = () => {
    if (!isDev) return null;
    
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 9999,
          bgcolor: 'rgba(76, 175, 80, 0.9)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          fontFamily: 'monospace',
        }}
      >
        DEV {import.meta.env.VITE_COGNITO_USER_POOL_ID ? '🔐' : '❌'}
      </Box>
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation items configuration

  // Mobile drawer content
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ p: 2, width: 250, bgcolor: '#000000' }}
    >
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button
              component={RouterLink}
              to={item.path}
              fullWidth
              sx={{
                textAlign: 'left',
                py: 1.5,
                position: 'relative',
                pl: 4, // Left padding for text alignment
                color: 'white', // Make text white
              }}
            >
              {location.pathname === item.path && (
                <Box
                  sx={{
                    height: 6,
                    width: 6,
                    bgcolor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    left: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              {item.name.toUpperCase()}
            </Button>
          </ListItem>
        ))}
        {SOCIAL_ITEMS.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Button
              component={item.path.startsWith('http') ? 'a' : RouterLink}
              href={item.path.startsWith('http') ? item.path : undefined}
              to={!item.path.startsWith('http') ? item.path : undefined}
              target={item.path.startsWith('http') ? '_blank' : undefined}
              rel={
                item.path.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              fullWidth
              sx={{ textAlign: 'left', py: 1.5, pl: 4, color: 'white' }}
            >
              {item.name}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Logo component used in both mobile and desktop views
  const Logo = ({ mobile = false }) => (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        mr: 2,
        display: mobile
          ? { xs: 'flex', md: 'none' }
          : { xs: 'none', md: 'flex' },
        flexGrow: mobile ? 1 : 0,
        alignItems: 'center',
        textDecoration: 'none',
      }}
    >
      <img src={logoSvg} alt="Notos Trader Logo" style={{ height: 40 }} />
    </Box>
  );

  // Fixed social links component that appears at bottom right
  const FixedSocialLinks = () => {
    // Only show on large screens
    if (!isLargeScreen) return null;

    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          padding: 1.5,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '4px',
        }}
      >
        {SOCIAL_ITEMS.map((item) => (
          <Button
            key={item.name}
            component={item.path.startsWith('http') ? 'a' : RouterLink}
            href={item.path.startsWith('http') ? item.path : undefined}
            to={!item.path.startsWith('http') ? item.path : undefined}
            target={item.path.startsWith('http') ? '_blank' : undefined}
            rel={
              item.path.startsWith('http') ? 'noopener noreferrer' : undefined
            }
            sx={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontWeight: 300,
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              color: 'white',
              p: 0.75,
              minWidth: 'auto',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <>
      <DevIndicator />
      <AppBar
        position="fixed"
        sx={{
          bgcolor: '#000000',
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{ width: '100%', px: 3, bgcolor: '#000000' }}
        >
          {/* Desktop Logo */}
          <Logo />

          {isMobile ? (
            <>
              {/* Mobile Logo and Menu */}
              <Logo mobile />
              <Box sx={{ display: 'flex', ml: 'auto', alignItems: 'center' }}>
                <WalletMultiButton
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    marginRight: 8,
                  }}
                />
                {!authDisabled && (
                  <Button
                    onClick={login}
                    disabled={loading}
                    sx={{ color: 'white' }}
                  >
                    {tokens ? 'Logged In' : error ? 'Login Error' : 'Login'}
                  </Button>
                )}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            /* Desktop Navigation - Main links only */
            <>
              <Box
                sx={{
                  display: 'flex',
                  ml: 4,
                }}
              >
                {/* Main navigation links on the left */}
                {NAV_ITEMS.map((item) => (
                  <Button
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontWeight: 300,
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                      color: 'white',
                      mx: 1, // Reduced spacing between nav links
                      pl: 3, // Add left padding for the dot
                      position: 'relative', // For absolute positioning of the dot
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {location.pathname === item.path && (
                      <Box
                        sx={{
                          height: 8,
                          width: 8,
                          bgcolor: 'white',
                          borderRadius: '50%',
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    )}
                    {item.name.toUpperCase()}
                  </Button>
                ))}
              </Box>

              {/* Wallet connect button */}
              <Box sx={{ display: 'flex', ml: 'auto', alignItems: 'center' }}>
                <WalletMultiButton
                  style={{ backgroundColor: 'white', color: 'black' }}
                />
                {!authDisabled && (
                  <Button
                    onClick={login}
                    disabled={loading}
                    sx={{ ml: 1, color: 'white', borderColor: 'white' }}
                    variant="outlined"
                  >
                    {tokens ? 'Logged In' : error ? 'Login Error' : 'Login'}
                  </Button>
                )}
              </Box>
            </>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              bgcolor: '#000000',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark backdrop
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>

      {/* Fixed Social Links at bottom right */}
      <FixedSocialLinks />
    </>
  );
}
