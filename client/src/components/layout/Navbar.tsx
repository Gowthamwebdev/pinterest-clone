import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { useAuthStore } from '@stores/AuthStore';
import { useUiStore } from '@stores/UiStore';
import pinterestSvg from '@assets/pinterest.svg';
import { Search, Close } from '@mui/icons-material';
import LogoutForm from '@components/form/LogoutFom';

type Props = {
  onLoginClick: () => void;
  onSignupClick: () => void;
};

const Navbar: React.FC<Props> = ({ onLoginClick, onSignupClick }) => {
  const navigate = useNavigate();
  const { auth } = useAuthStore();
  const { setOpenModal } = useUiStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const open = Boolean(anchorEl);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    navigate(`/${path}`);
    handleMenuClose();
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-3 bg-white shadow sticky top-0 z-10">
      <div className="flex items-center">
        <img
          src={pinterestSvg}
          alt="Pinterest Logo"
          className="w-6 mx-auto mb-2 mr-2"
        />
        <span
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#e60023',
            marginRight: '20px',
          }}
        >
          Pinterest
        </span>
        {!auth.isAuthenticated && (
          <Button
            variant="text"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'none',
              marginRight: '20px',
            }}
          >
            Explore
          </Button>
        )}
        <div className="flex items-center bg-[#f5f5f5] px-4 py-2 rounded-full flex-grow mr-3">
          <Search className="text-gray-500 mr-2" />
          <TextField
            fullWidth
            placeholder="Search"
            variant="standard"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            slotProps={{ input: { disableUnderline: true } }}
            sx={{
              fontSize: 14,
              paddingLeft: '10px',
              width: '100%',
            }}
          />
          {searchQuery.length > 0 && (
            <IconButton
              onClick={handleClearSearch}
              size="small"
              sx={{ color: 'gray.500' }}
              aria-label="Clear search"
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {auth.isAuthenticated ? (
          <>
            <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 2 }}>
              <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
              <div className="ml-2 text-gray-700 font-semibold">
                <FiChevronDown size={20} />
              </div>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                  width: 200,
                  height: 100,
                },
              }}
            >
              <MenuItem onClick={() => handleNavigation('profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <LogoutForm />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                onSignupClick();
                setOpenModal(false);
              }}
              sx={{
                backgroundColor: '#e6e6e6',
                '&:hover': { backgroundColor: '#d9d9d9' },
                boxShadow: 'none',
                color: 'black',
                borderRadius: '30px',
                fontWeight: 'bold',
                textTransform: 'none',
                padding: '8px 15px',
                fontSize: '15px',
                fontFamily: 'Neue Haas Grotesk, Arial, Helvetica, sans-serif',
              }}
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                onLoginClick();
                setOpenModal(true);
              }}
              sx={{
                backgroundColor: '#e60023',
                '&:hover': { backgroundColor: '#ad081b' },
                boxShadow: 'none',
                color: 'white',
                borderRadius: '30px',
                fontWeight: 'bold',
                textTransform: 'none',
                padding: '8px 15px',
                fontSize: '15px',
                fontFamily: 'Neue Haas Grotesk, Arial, Helvetica, sans-serif',
              }}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
