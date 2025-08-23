import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { User, Bell, MessageSquare, X, Home, BarChart3, Settings, LogOut, Search, Send, CheckCheck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProfileIcon from './ProfileIcon';

const NavigationBar = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);


  useEffect(() => {
    
    fetchProfile();
    fetchNotifications();
    fetchMessages();
    fetchAllUsers();
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchNotifications();
      fetchMessages();
      if (selectedUser) {
        fetchChatHistory(selectedUser.id);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter users based on search query
    if (!Array.isArray(allUsers)) {
      setFilteredUsers([]);
      return;
    }
    if (searchQuery.trim() === '') {
      setFilteredUsers([]);
    } else {
      const filtered = allUsers.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, allUsers]);

  useEffect(() => {
    // Auto-scroll to bottom of chat
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Ensure JWT token is sent in all protected API calls
  const getAuthHeaders = () => {
    const token = localStorage.getItem("jwtToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error('Profile API did not return JSON. Status:', res.status);
        setProfile(null);
        return;
      }
      const result = await res.json();
      console.log('Profile API result:', result);
      if (result.success && result.data) setProfile(result.data);
      else setProfile(null);
    } catch (err) {
      console.error('Profile API fetch error:', err);
      setProfile(null);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications", {
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error('Notifications API did not return JSON. Status:', res.status);
        setNotifications([]);
        return;
      }
      const result = await res.json();
      if (Array.isArray(result)) setNotifications(result);
      else if (result.success && Array.isArray(result.data)) setNotifications(result.data);
      else setNotifications([]);
    } catch (err) {
      console.error('Notifications API fetch error:', err);
      setNotifications([]);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages", {
        headers: getAuthHeaders()
      });
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error('Messages API did not return JSON. Status:', res.status);
        setMessages([]);
        return;
      }
      const result = await res.json();
      if (Array.isArray(result)) setMessages(result);
      else if (result.success && Array.isArray(result.data)) setMessages(result.data);
      else setMessages([]);
    } catch (err) {
      console.error('Messages API fetch error:', err);
      setMessages([]);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllUsers(res.data || []);
    } catch (error) {
      setAllUsers([]);
    }
  };

  const fetchChatHistory = async (userId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.get(`/api/messages/chat/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory(res.data || []);
    } catch (error) {
      setChatHistory([]);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.patch(`/api/notifications/${notificationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markMessageAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.patch(`/api/messages/${messageId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !selectedUser) return;

    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post('/api/messages/send', {
        receiverId: selectedUser.id,
        message: messageText.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessageText('');
      fetchChatHistory(selectedUser.id);
      fetchMessages();
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const closeAllPanels = () => {
    setShowUserPanel(false);
    setShowNotifications(false);
    setShowMessages(false);
    setSelectedUser(null);
    setSearchQuery('');
    setFilteredUsers([]);
  };

  const toggleUserPanel = () => {
    closeAllPanels();
    setShowUserPanel(!showUserPanel);
  };

  const toggleNotifications = () => {
    closeAllPanels();
    setShowNotifications(!showNotifications);
  };

  const toggleMessages = () => {
    closeAllPanels();
    setShowMessages(!showMessages);
  };

  const selectUser = (selectedUser) => {
    setSelectedUser(selectedUser);
    setSearchQuery('');
    setFilteredUsers([]);
    fetchChatHistory(selectedUser.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setShowUserPanel(false);
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleProfileClick = async () => {
    await fetchProfile();
    setShowUserPanel(true);
  };

  return (
    <>
      <nav className="bg-green-600 px-4 py-3 flex items-center justify-between relative z-50 w-full">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/')}>BrewOps</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleMessages} className="p-2 text-white hover:bg-green-700 rounded-lg transition-colors relative">
            <MessageSquare className="w-5 h-5" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadMessages > 99 ? '99+' : unreadMessages}
              </span>
            )}
          </button>
          <button onClick={toggleNotifications} className="p-2 text-white hover:bg-green-700 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications > 99 ? '99+' : unreadNotifications}
              </span>
            )}
          </button>
          {/* Replace profile icon button with ProfileIcon component */}
          <ProfileIcon onClick={handleProfileClick} />
        </div>

        {/* Overlay */}
        {(showUserPanel || showNotifications || showMessages) && (
          <div className="fixed inset-0" onClick={closeAllPanels} />
        )}

        {/* User Profile Panel */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white transform transition-transform duration-300 ease-in-out z-50 ${showUserPanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {profile && profile.name ? getInitials(profile.name) : (profile && profile.email ? getInitials(profile.email) : 'U')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{profile && profile.name ? profile.name : (profile && profile.email ? profile.email : 'No Name')}</h3>
                  <p className="text-sm text-gray-600">{profile && profile.role ? profile.role : 'No Role'}</p>
                </div>
              </div>
              <button onClick={() => setShowUserPanel(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors" onClick={() => navigate('/')}> 
              <Home className="w-5 h-5 text-gray-600" /> 
              <span>Dashboard</span> 
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors" onClick={() => navigate('/Staff/profile')}> 
              <User className="w-5 h-5 text-gray-600" /> 
              <span>Profile</span> 
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors" onClick={() => navigate('/ProductionManagerDashboard')}> 
              <BarChart3 className="w-5 h-5 text-gray-600" /> 
              <span>Reports</span> 
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors" onClick={() => navigate('/Staff/profile/setting')}> 
              <Settings className="w-5 h-5 text-gray-600" /> 
              <span>Settings</span> 
            </button>
            <hr className="my-4" />
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-red-600" onClick={handleLogout}> 
              <LogOut className="w-5 h-5" /> 
              <span>Log out</span> 
            </button>
          </div>
        </div>

        {/* Notifications Panel */}
        <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${showNotifications ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4 space-y-3 h-full overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-gray-500 text-center py-8">No notifications</div>
            ) : (
              notifications.map((notif, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    notif.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => markNotificationAsRead(notif.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notif.read ? 'bg-gray-100' : 'bg-blue-100'
                    }`}>
                      <Bell className={`w-4 h-4 ${notif.read ? 'text-gray-600' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${notif.read ? 'text-gray-900' : 'text-blue-900'}`}>
                        {notif.title || 'Notification'}
                      </p>
                      <p className={`text-xs ${notif.read ? 'text-gray-600' : 'text-blue-700'}`}>
                        {notif.body || ''}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time || ''}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Messages Panel */}
        <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${showMessages ? 'translate-x-0' : 'translate-x-full'}`}>
          {!selectedUser ? (
            // User Search and List View
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Messages</h3>
                  <button onClick={() => setShowMessages(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {/* Search Results */}
                {filteredUsers.length > 0 && (
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Search Results</h4>
                    <div className="space-y-2">
                      {filteredUsers.map((searchUser) => (
                        <div
                          key={searchUser.id}
                          className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                          onClick={() => selectUser(searchUser)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                              {getInitials(searchUser.name)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{searchUser.name}</p>
                              <p className="text-xs text-gray-600">{searchUser.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Recent Messages */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Messages</h4>
                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <div className="text-gray-500 text-center py-8">No messages</div>
                    ) : (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-3 hover:bg-gray-50 rounded-lg cursor-pointer ${
                            !msg.read ? 'bg-blue-50 border border-blue-200' : ''
                          }`}
                          onClick={() => {
                            selectUser({ id: msg.senderId, name: msg.senderName, role: msg.senderRole });
                            markMessageAsRead(msg.id);
                          }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                              {msg.senderInitials || getInitials(msg.senderName || 'Unknown')}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{msg.senderName || 'Unknown'}</p>
                              <p className="text-xs text-gray-600 truncate">{msg.body || ''}</p>
                              <p className="text-xs text-gray-500 mt-1">{msg.time || ''}</p>
                            </div>
                            {!msg.read && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                          </div>
                        </div>
                      ))
                   ) }
                  </div>
                </div>
              </div>
            </>
         ) : (
            // Chat View
            <>
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-gray-100 rounded">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {getInitials(selectedUser.name)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{selectedUser.name}</h3>
                      <p className="text-xs text-gray-600">{selectedUser.role}</p>
                    </div>
                  </div>
                  <button onClick={() => setShowMessages(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${
                      chat.senderId === user?.id 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm">{chat.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${
                          chat.senderId === user?.id ? 'text-green-200' : 'text-gray-500'
                        }`}>
                          {chat.time}
                        </p>
                        {chat.senderId === user?.id && (
                          <div className="ml-2">
                            {chat.read ? (
                              <CheckCheck className="w-3 h-3 text-green-200" />
                            ) : (
                              <Check className="w-3 h-3 text-green-200" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
           )}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;