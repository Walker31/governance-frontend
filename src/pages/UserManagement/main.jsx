import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Chip,
  Avatar,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const UserManagement = () => {
  const { user: currentUser, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingUser, setUpdatingUser] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      return;
    }
    fetchUsers();
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await authService.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      setError(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      setUpdatingUser(userId);
      await authService.updateUserStatus(userId, !currentStatus);
      
      // Update local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId
            ? { ...user, isActive: !currentStatus }
            : user
        )
      );
    } catch (error) {
      setError(error.message || 'Failed to update user status');
    } finally {
      setUpdatingUser(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAdmin()) {
    return (
      <Box className="p-6">
        <Alert severity="error">
          Access denied. Admin privileges required to view this page.
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold text-gray-900">
          User Management
        </Typography>
        <Tooltip title="Refresh users">
          <IconButton onClick={fetchUsers} className="bg-gray-100 hover:bg-gray-200">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper className="overflow-hidden">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold">User</TableCell>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell className="font-semibold">Role</TableCell>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell className="font-semibold">Joined</TableCell>
                <TableCell className="font-semibold">Last Login</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="hover:bg-gray-50">
                  <TableCell>
                    <Box className="flex items-center gap-3">
                      <Avatar src={user.avatar} alt={user.name} />
                      <Box>
                        <Typography variant="body2" className="font-medium">
                          {user.name}
                        </Typography>
                        {user._id === currentUser._id && (
                          <Chip
                            label="You"
                            size="small"
                            className="bg-blue-100 text-blue-800 text-xs"
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      className={
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Box className="flex items-center gap-2">
                      {user.isActive ? (
                        <ActiveIcon className="text-green-500" fontSize="small" />
                      ) : (
                        <InactiveIcon className="text-red-500" fontSize="small" />
                      )}
                      <Chip
                        label={user.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        className={
                          user.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {formatDate(user.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600">
                      {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user._id !== currentUser._id && (
                      <Tooltip title={user.isActive ? 'Deactivate user' : 'Activate user'}>
                        <Switch
                          checked={user.isActive}
                          onChange={() => handleStatusToggle(user._id, user.isActive)}
                          disabled={updatingUser === user._id}
                          color="primary"
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box className="mt-4 text-center">
        <Typography variant="body2" className="text-gray-500">
          Total Users: {users.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserManagement; 