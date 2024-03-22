import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import getCachedSession from './getCachedSession';

const UserInfo = async () => {
  const { user } = await getCachedSession();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        pl: 0.5
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={user?.image!}
          sx={{
            bgcolor: 'secondary.main',
            height: '32px',
            width: '32px'
          }}
        />
        <Box>
          <Typography variant="body2">{user?.name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {user?.org_name}
          </Typography>
        </Box>
      </Box>
      <IconButton
        aria-label={'sign out'}
        href="/api/auth/logout"
        sx={{ minHeight: 48, width: 48, justifyContent: 'center' }}>
        <ExitToAppIcon />
      </IconButton>
    </Box>
  );
};

export default UserInfo;
