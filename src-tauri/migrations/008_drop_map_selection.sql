-- map_selection is fully retired now that the save picker/wizard/Settings (see save table,
-- migration 007) own map selection per-save via save.map_key/custom_image/custom_map_name.
-- Nothing reads or writes this table anymore.
DROP TABLE map_selection;
