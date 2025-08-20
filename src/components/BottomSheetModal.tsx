import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetView,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useAppTheme } from "../hooks/useAppTheme";

export type BottomSheetModalProps = {
  onChange?: (index: number) => void;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
};

export type BottomSheetModalRef = GorhomBottomSheetModal;

const BottomSheetModal = forwardRef<BottomSheetModalRef, BottomSheetModalProps>(
  ({ onChange, children, snapPoints = ["25%", "50%"] }, ref) => {
    const { colors } = useAppTheme();
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const handleSheetChanges = useCallback(
      (index: number) => {
        onChange?.(index);
      },
      [onChange],
    );
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );

    return (
      <GorhomBottomSheetModal
        ref={ref}
        snapPoints={memoSnapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.card }}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
      >
        <BottomSheetView style={[styles.contentContainer]}>
          {children}
        </BottomSheetView>
      </GorhomBottomSheetModal>
    );
  },
);

BottomSheetModal.displayName = "BottomSheetModal";

export default BottomSheetModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
});
