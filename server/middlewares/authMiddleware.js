module.exports = {
    hasPermission: function (perm, user) {
        if (!user) return false;
        for (item in user.permissions) {
            if (user.permissions[item].codename == perm) {
                return true;
            }
        }

        return false;
    },
    isSuperUserOrhasPermission: function (perm, user) {
        //check if user is_superuser
        if (!user) return false;
        if (user.is_active !== 1) return false;
        if (user.status_auth !== 'active') return false;
        if (user.is_superuser && Number(user.is_superuser) == 1) {
            return true;
        }

        for (item in user.permissions) {
            if (user.permissions[item].codename === perm) {
                return true;
            }
        }

        return false;
    },
    is_authenticate: function (user) {
        if (user) {
            return true;
        } //endif

        return false;
    },
};
